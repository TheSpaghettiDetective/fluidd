<template>
  <div class="file-system">
    <!-- <pre>selected: {{ selected }}</pre> -->
    <!-- <div class="bulk-actions" v-if="selected.length > 0">
      Some bulk actions.
    </div> -->

    <v-data-table
      v-model="selectedItems"
      :headers="headers"
      :items="files"
      :dense="dense"
      disable-pagination
      :loading="loading"
      sort-desc
      :custom-sort="customSort"
      :search="search"
      :show-select="bulkActions"
      :no-data-text="$t('app.file_system.msg.not_found')"
      :no-results-text="$t('app.file_system.msg.not_found')"
      item-key="name"
      height="100%"
      mobile-breakpoint="0"
      sort-by="modified"
      hide-default-footer
      class="rounded-0"
      fixed-header
      @input="handleSelected"
      @item-selected="handleItemSelected"
    >
      <template #item="{ item, isSelected, select }">
        <tr
          :class="{
            'is-directory': (item.type === 'directory'),
            'is-file': (item.type === 'file'),
            'is-disabled': disabled,
            'v-data-table__selected': (isSelected && item.name !== '..')
          }"
          class="row-select px-1"
          :draggable="draggable(item)"
          @click.prevent="$emit('row-click', item, $event)"
          @contextmenu.prevent="$emit('row-click', item, $event)"
          @dragstart="handleDragStart(item, $event)"
          @dragend="handleDragEnd"
          @drop.prevent.stop="handleDrop(item, $event)"
          @dragover.prevent="handleDragOver($event)"
          @dragleave.prevent="handleDragLeave($event)"
        >
          <td v-if="bulkActions">
            <v-simple-checkbox
              v-if="item.name !== '..'"
              v-ripple
              :value="isSelected"
              color=""
              class="mt-1"
              @click.stop="select(!isSelected)"
            />
          </td>
          <td>
            <!-- icons are 16px small, or 24px for standard size. -->
            <v-layout justify-center>
              <v-icon
                v-if="!item.thumbnails || !item.thumbnails.length"
                :small="dense"
                :color="(item.type === 'file') ? 'grey' : 'primary'"
              >
                {{ getItemIcon(item) }}
              </v-icon>
              <img
                v-else
                :style="{'max-width': `${thumbnailSize}px`, 'max-height': `${thumbnailSize}px`}"
                :src="getThumbUrl(item.thumbnails, root, item.path, thumbnailSize > 16, item.modified)"
              >
            </v-layout>
          </td>

          <file-row-item :nowrap="false">
            {{ item.name }}
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="object_height"
          >
            <span v-if="item.object_height !== undefined">
              {{ $filters.getReadableLengthString(item.object_height) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="first_layer_height"
          >
            <span v-if="item.first_layer_height !== undefined">
              {{ item.first_layer_height }} mm
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="layer_height"
          >
            <span v-if="item.layer_height !== undefined">
              {{ item.layer_height }} mm
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="filament_name"
          >
            <span v-if="item.filament_name !== undefined">
              {{ item.filament_name }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="filament_type"
          >
            <span v-if="item.filament_type !== undefined">
              {{ item.filament_type }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="filament_total"
          >
            <span v-if="item.filament_total !== undefined">
              {{ $filters.getReadableLengthString(item.filament_total) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="filament_weight_total"
          >
            <span v-if="item.filament_weight_total !== undefined">
              {{ $filters.getReadableWeightString(item.filament_weight_total) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="history.filament_used"
          >
            <span v-if="item.history && item.history.filament_used !== undefined">
              {{ $filters.getReadableLengthString(item.history.filament_used) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="nozzle_diameter"
          >
            <span v-if="item.nozzle_diameter !== undefined">
              {{ item.nozzle_diameter }} mm
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="slicer"
          >
            <span v-if="item.slicer !== undefined">
              {{ item.slicer }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="slicer_version"
          >
            <span v-if="item.slicer_version !== undefined">
              {{ item.slicer_version }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="estimated_time"
          >
            <span v-if="item.estimated_time !== undefined">
              {{ $filters.formatCounterTime(item.estimated_time) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="history.print_duration"
          >
            <span v-if="item.history && item.history.print_duration !== undefined">
              {{ $filters.formatCounterTime(item.history.print_duration) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="history.total_duration"
          >
            <span v-if="item.history && item.history.total_duration !== undefined">
              {{ $filters.formatCounterTime(item.history.total_duration) }}
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="first_layer_bed_temp"
          >
            <span v-if="item.first_layer_bed_temp !== undefined">
              {{ item.first_layer_bed_temp }}<small>°C</small>
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="first_layer_extr_temp"
          >
            <span v-if="item.first_layer_extr_temp !== undefined">
              {{ item.first_layer_extr_temp }}<small>°C</small>
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="chamber_temp"
          >
            <span v-if="item.chamber_temp !== undefined">
              {{ item.chamber_temp }}<small>°C</small>
            </span>
          </file-row-item>

          <file-row-item
            v-if="root === 'gcodes'"
            :headers="headers"
            item-value="print_start_time"
          >
            <span v-if="item.print_start_time !== undefined && item.print_start_time !== null">
              {{ $filters.formatDateTime(item.print_start_time * 1000) }}
            </span>
          </file-row-item>

          <file-row-item
            :headers="headers"
            item-value="modified"
          >
            <span v-if="item.modified !== undefined && item.name !== '..'">
              {{ $filters.formatDateTime(item.modified * 1000) }}
            </span>
          </file-row-item>

          <file-row-item
            :headers="headers"
            item-value="size"
          >
            <span v-if="item.size !== undefined && item.name !== '..'">
              {{ $filters.getReadableFileSizeString(item.size) }}
            </span>
          </file-row-item>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import { FileBrowserEntry, RootProperties } from '@/store/files/types'
import { AppTableHeader } from '@/types'
import FilesMixin from '@/mixins/files'

import FileRowItem from './FileRowItem.vue'
import { SupportedImageFormats, SupportedVideoFormats } from '@/globals'

@Component({
  components: {
    FileRowItem
  }
})
export default class FileSystemBrowser extends Mixins(FilesMixin) {
  @Prop({ type: String, required: true })
  readonly root!: string

  @Prop({ type: Array, required: true })
  readonly files!: FileBrowserEntry[]

  @Prop({ type: Boolean, default: false })
  readonly dense!: boolean

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  // Currently defined list of headers.
  @Prop({ type: Array, required: true })
  readonly headers!: AppTableHeader[]

  @Prop({ type: String, required: false })
  readonly search!: string

  @Prop({ type: Boolean, required: true })
  readonly dragState!: boolean

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean

  @Prop({ type: Boolean, default: false })
  readonly bulkActions!: boolean

  @Prop({ type: Array, required: true })
  readonly selected!: FileBrowserEntry[]

  dragItem: FileBrowserEntry | null = null
  ghost: HTMLDivElement | undefined = undefined
  selectedItems: FileBrowserEntry[] = []

  // Is the history component enabled
  get showHistory () {
    return (
      this.$store.getters['server/componentSupport']('history') &&
      this.root === 'gcodes'
    )
  }

  get rootProperties (): RootProperties {
    return this.$store.getters['files/getRootProperties'](this.root) as RootProperties
  }

  get readonly () {
    return this.rootProperties.readonly
  }

  get thumbnailSize () {
    const thumbnailSize = this.$store.state.config.uiSettings.general.thumbnailSize

    return this.dense ? thumbnailSize / 2 : thumbnailSize
  }

  get textSortOrder () {
    return this.$store.state.config.uiSettings.general.textSortOrder
  }

  customSort (items: FileBrowserEntry[], sortBy: string[], sortDesc: boolean[], locale: string) {
    return this.$filters.fileSystemSort(items, sortBy, sortDesc, locale, this.textSortOrder)
  }

  mounted () {
    this.selectedItems = this.selected
  }

  // Make sure we update the selected items if it's changed.
  @Watch('selected')
  onSelected (selected: FileBrowserEntry[]) {
    this.selectedItems = selected
  }

  // When the selected items change, update the parent.
  handleSelected (selected: FileBrowserEntry[]) {
    this.$emit('update:selected', selected)
  }

  // We ignore our [..] dir, so handle faking our checkbox states.
  handleItemSelected (item: { item: FileBrowserEntry; value: boolean }) {
    // If last two, and filtered results in 0 - set to 0.
    if (
      !item.value &&
      this.selectedItems.length <= 2 &&
      this.selectedItems.filter(fileOrFolder => (fileOrFolder.name !== '..' && item.item !== fileOrFolder)).length === 0
    ) {
      this.selectedItems = []
    }

    // If top two, and filtered results in count -1, set to all.
    if (
      item.value &&
      this.selectedItems.length + 2 >= this.files.length &&
      this.selectedItems.length + 1 === this.files.filter(fileOrFolder => (fileOrFolder.name !== '..')).length
    ) {
      this.selectedItems = this.files
    }
  }

  getItemIcon (item: FileBrowserEntry) {
    const readonly = (
      this.readonly ||
      (
        item.permissions !== undefined &&
        !item.permissions.includes('w')
      )
    )

    if (item.type === 'file') {
      if (item.extension === 'zip') {
        return readonly ? '$fileZipLock' : '$fileZip'
      } else if (
        SupportedImageFormats.includes(`.${item.extension}`) ||
            SupportedVideoFormats.includes(`.${item.extension}`)
      ) {
        return readonly ? '$fileImageLock' : '$fileImage'
      } else {
        return readonly ? '$fileLock' : '$file'
      }
    } else if (item.name === '..') {
      return '$folderUp'
    } else {
      return readonly ? '$folderLock' : '$folder'
    }
  }

  // Determines if a row is currently in a draggable state or not.
  draggable (item: FileBrowserEntry) {
    return (
      item.name !== '..' &&
      this.files.length > 0 &&
      (
        this.selected.length === 0 ||
        this.selected.includes(item)
      )
    )
  }

  // Fake a drag image when the user drags a file or folder.
  handleDragStart (item: FileBrowserEntry, e: DragEvent) {
    if (this.dragState !== true) {
      this.dragItem = item
      this.$emit('update:dragState', true)
    }

    if (e.dataTransfer) {
      const filteredSelectedItems = this.selected
        .filter(item => (item.name !== '..'))
      const draggedItems = filteredSelectedItems.length > 0
        ? filteredSelectedItems
        : [item]

      this.ghost = document.createElement('div')
      this.ghost.classList.add('bulk-drag')
      this.ghost.classList.add((this.$vuetify.theme.dark) ? 'theme--dark' : 'theme--light')
      this.ghost.innerHTML = this.$tc('app.file_system.tooltip.move_item', draggedItems.length)
      document.body.appendChild(this.ghost)
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setDragImage(this.ghost, 0, 0)
      const source = draggedItems
      this.$emit('drag-start', source, e.dataTransfer)
    }
  }

  // File was dropped on another table row.
  handleDrop (destination: FileBrowserEntry, e: DragEvent) {
    this.handleDragLeave(e)
    if (
      destination.type === 'directory' &&
      this.dragItem &&
      this.dragItem !== destination
    ) {
      const filteredSelectedItems = this.selected
        .filter(item => (item.name !== '..'))
      const draggedItems = filteredSelectedItems.length > 0
        ? filteredSelectedItems
        : [this.dragItem]

      if (!draggedItems.includes(destination)) {
        this.$emit('move', draggedItems, destination)
      }
    }
  }

  // Handles highlighting rows as drag over them
  handleDragOver (e: DragEvent) {
    const element = e.target as HTMLElement
    if (element) {
      if (
        element.tagName === 'TD' &&
        element.parentElement?.classList.contains('is-directory')
      ) {
        const row = element.parentElement
        if (row) row.classList.add('active')
      }
    }
  }

  // Handles un highlighting rows as we drag out of them.
  handleDragLeave (e: DragEvent) {
    const element = e.target as HTMLElement
    if (element?.tagName === 'TD') {
      const row = element.parentElement
      if (row) row.classList.remove('active')
    }
  }

  // Drag ended
  handleDragEnd () {
    const e = this.ghost as HTMLDivElement
    document.body.removeChild(e)
    this.dragItem = null
    this.$emit('update:dragState', false)
  }
}
</script>

<style lang="scss" scoped>
  @import 'vuetify/src/styles/styles.sass';

  // Lighten up dark mode checkboxes.
  .theme--dark :deep(.v-simple-checkbox .v-icon) {
    color: rgba(map-deep-get($material-dark, 'inputs', 'box'), 0.25);
  }
</style>
