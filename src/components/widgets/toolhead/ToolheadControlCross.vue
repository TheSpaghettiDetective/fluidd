<template>
  <div>
    <v-row
      no-gutters
      justify="start"
      class="mb-2"
    >
      <v-col
        cols="auto"
        class="ml-12 mr-12"
      >
        <app-btn-toolhead-move
          :color="axisButtonColor(yHomed)"
          :disabled="axisButtonDisabled(yHomed, yHasMultipleSteppers)"
          icon="$up"
          @click="sendMoveGcode('Y', toolheadMoveLength)"
        />
      </v-col>
      <v-col
        cols="auto"
        class="ml-2"
      >
        <app-btn-toolhead-move
          :color="axisButtonColor(zHomed)"
          :disabled="axisButtonDisabled(zHomed, zHasMultipleSteppers)"
          icon="$up"
          @click="sendMoveGcode('Z', toolheadMoveLength)"
        />
      </v-col>
      <v-col
        class="ml-2"
      >
        <app-btn-toolhead-move
          :color="(!allHomed) ? 'primary' : undefined"
          :loading="hasWait($waits.onHomeAll)"
          :disabled="!klippyReady || printerPrinting"
          icon="$home"
          small-icon
          @click="sendGcode('G28', $waits.onHomeAll)"
        >
          {{ $t('app.tool.btn.home_all') }}
        </app-btn-toolhead-move>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="start"
      class="mb-2"
    >
      <v-col
        cols="auto"
        :class="{
          'mr-12': !canHomeXY,
        }"
      >
        <app-btn-toolhead-move
          :color="axisButtonColor(xHomed)"
          :disabled="axisButtonDisabled(xHomed, xHasMultipleSteppers)"
          icon="$left"
          @click="sendMoveGcode('X', toolheadMoveLength, true)"
        />
      </v-col>
      <v-col
        v-if="canHomeXY"
        cols="auto"
        class="ml-2"
      >
        <app-btn-toolhead-move
          :color="(!xyHomed) ? 'primary' : undefined"
          :loading="hasWait($waits.onHomeXY)"
          :disabled="!klippyReady || printerPrinting"
          :tooltip="$t('app.tool.tooltip.home_xy')"
          icon="$home"
          @click="sendGcode('G28 X Y', $waits.onHomeXY)"
        />
      </v-col>
      <v-col
        cols="auto"
        class="ml-2"
        justify="end"
      >
        <app-btn-toolhead-move
          :color="axisButtonColor(xHomed)"
          :disabled="axisButtonDisabled(xHomed, xHasMultipleSteppers)"
          icon="$right"
          @click="sendMoveGcode('X', toolheadMoveLength)"
        />
      </v-col>
      <v-col
        v-if="canHomeXY"
        cols="auto"
        class="ml-2"
      >
        <app-btn-toolhead-move
          :color="(!zHomed) ? 'primary' : undefined"
          :loading="hasWait($waits.onHomeZ)"
          :disabled="!klippyReady || printerPrinting"
          :tooltip="$t('app.tool.tooltip.home_z')"
          icon="$home"
          @click="sendGcode('G28 Z', $waits.onHomeZ)"
        />
      </v-col>
      <v-col
        v-if="canHomeXY"
        class="ml-2"
      >
        <app-btn-toolhead-move
          :color="(!xHomed) ? 'primary' : undefined"
          :loading="hasWait($waits.onHomeX)"
          :disabled="!klippyReady || printerPrinting"
          icon="$home"
          small-icon
          @click="sendGcode('G28 X', $waits.onHomeX)"
        >
          {{ $t('app.tool.btn.home_x') }}
        </app-btn-toolhead-move>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="start"
      class="mb-2"
    >
      <v-col
        cols="auto"
        class="ml-12 mr-7"
      >
        <app-btn-toolhead-move
          :color="axisButtonColor(yHomed)"
          :disabled="axisButtonDisabled(yHomed, yHasMultipleSteppers)"
          icon="$down"
          @click="sendMoveGcode('Y', toolheadMoveLength, true)"
        />
      </v-col>
      <v-col
        cols="auto"
        class="ml-7"
      >
        <app-btn-toolhead-move
          :color="axisButtonColor(zHomed)"
          :disabled="axisButtonDisabled(zHomed, zHasMultipleSteppers)"
          icon="$down"
          @click="sendMoveGcode('Z', toolheadMoveLength, true)"
        />
      </v-col>
      <v-col
        v-if="canHomeXY"
        class="ml-2"
      >
        <app-btn-toolhead-move
          :color="(!yHomed) ? 'primary' : undefined"
          :loading="hasWait($waits.onHomeY)"
          :disabled="!klippyReady || printerPrinting"
          icon="$home"
          small-icon
          @click="sendGcode('G28 Y', $waits.onHomeY)"
        >
          {{ $t('app.tool.btn.home_y') }}
        </app-btn-toolhead-move>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="start"
      class="mb-2"
    >
      <v-col>
        <v-btn-toggle
          v-model.number="toolheadMoveLength"
          mandatory
          dense
        >
          <app-btn
            v-for="(distance, index) of toolheadMoveDistances"
            :key="index"
            small
            min-width="40"
            :value="distance"
            :elevation="2"
            :disabled="!klippyReady"
          >
            {{ distance }}
          </app-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import StateMixin from '@/mixins/state'
import ToolheadMixin from '@/mixins/toolhead'

@Component({})
export default class ToolheadControlCross extends Mixins(StateMixin, ToolheadMixin) {
  moveLength = ''
  fab = false

  get forceMove () {
    return this.$store.state.config.uiSettings.toolhead.forceMove
  }

  get kinematics () {
    return this.$store.getters['printer/getPrinterSettings']('printer.kinematics') || ''
  }

  get canHomeXY () {
    return !['delta', 'rotary_delta'].includes(this.kinematics)
  }

  get toolheadMoveDistances () {
    const distances = this.$store.state.config.uiSettings.general.toolheadMoveDistances
    if (distances.includes(this.toolheadMoveLength)) {
      return distances
    }

    // safety for when no valid move length is present
    return [this.toolheadMoveLength, ...distances].sort((a, b) => a - b)
  }

  get toolheadMoveLength () {
    return (this.moveLength === '')
      ? this.$store.state.config.uiSettings.general.defaultToolheadMoveLength
      : this.moveLength
  }

  set toolheadMoveLength (val: string) {
    this.moveLength = val
  }

  axisButtonColor (axisHomed: boolean) {
    if (this.forceMove) return 'error'

    return axisHomed ? 'primary' : undefined
  }

  axisButtonDisabled (axisHomed: boolean, axisMultipleSteppers: boolean) {
    return !this.klippyReady || (!axisHomed && !(this.forceMove && !axisMultipleSteppers))
  }

  /**
   * Send a move gcode script.
   */
  sendMoveGcode (axis: string, distance: string, negative = false) {
    axis = axis.toLowerCase()
    const rate = (axis.toLowerCase() === 'z')
      ? this.$store.state.config.uiSettings.general.defaultToolheadZSpeed
      : this.$store.state.config.uiSettings.general.defaultToolheadXYSpeed
    const inverted = this.$store.state.config.uiSettings.general.axis[axis].inverted || false
    distance = ((negative && !inverted) || (!negative && inverted))
      ? '-' + distance
      : distance

    if (this.forceMove) {
      const accel = (axis.toLowerCase() === 'z')
        ? this.$store.getters['printer/getPrinterSettings']('printer.max_z_accel')
        : this.$store.state.printer.printer.toolhead.max_accel
      this.sendGcode(`FORCE_MOVE STEPPER=stepper_${axis} DISTANCE=${distance} VELOCITY=${rate} ACCEL=${accel}`)
    } else {
      this.sendGcode(`G91
      G1 ${axis}${distance} F${rate * 60}
      G90`)
    }
  }
}
</script>

<style type="scss" scoped>
  :deep(.v-speed-dial__list) {
    flex-direction: column !important;
  }
</style>
