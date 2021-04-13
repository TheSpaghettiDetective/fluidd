import {
  mdiHome,
  mdiClose,
  mdiTune,
  mdiMinus,
  mdiPlus,
  mdiCheck,
  mdiFire,
  mdiCog,
  mdiCarBrakeAlert,
  mdiPrinter3d,
  mdiPrinter3dNozzleOutline,
  mdiFileCodeOutline,
  mdiTools,
  mdiConsole,
  mdiFileMultipleOutline,
  mdiChevronUp,
  mdiChevronDown,
  mdiTimerSand,
  mdiClockOutline,
  mdiFormatLineSpacing,
  mdiFileDocumentOutline,
  mdiPause,
  mdiWindowClose,
  mdiPlayBoxOutline,
  mdiPrinter,
  mdiCamera,
  mdiFan,
  mdiArrowUp,
  mdiArrowDown,
  mdiArrowLeft,
  mdiArrowRight,
  mdiArrowCollapseDown,
  mdiViewGridOutline,
  mdiArrowExpandHorizontal,
  mdiRefresh,
  mdiCheckCircleOutline,
  mdiCheckboxBlankCircleOutline,
  mdiPrinter3dNozzleAlertOutline,
  mdiAlertCircle,
  mdiFolderPlus,
  mdiFile,
  mdiFolder,
  mdiPencil,
  mdiMagnify,
  mdiDownload,
  mdiFormTextbox,
  mdiDelete,
  mdiCogs,
  mdiContentSaveOutline,
  mdiAlert,
  mdiDotsVertical,
  mdiSend,
  mdiArrowHorizontalLock,
  mdiChartTimelineVariant,
  mdiFireAlert,
  mdiSnowflakeAlert,
  mdiUpload,
  mdiFolderUpload,
  mdiProgressUpload,
  mdiRadioboxMarked,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiMenuDown,
  mdiFilePlus,
  mdiBellOutline,
  mdiPower,
  mdiPowerCycle,
  mdiRestart,
  mdiRestartAlert,
  mdiUpdate,
  mdiChevronRight,
  mdiChevronLeft,
  mdiDrag,
  mdiCheckboxMultipleBlank,
  mdiOpenInApp,
  mdiDesktopTower,
  mdiDotsHorizontal,
  mdiElectricSwitch,
  mdiElectricSwitchClosed,
  mdiMotionOutline,
  mdiThermometerLow,
  mdiHelpCircle,
  mdiHistory,
  mdiFilterOutline,
  mdiSourceCommit,
  mdiArrowExpandUp
} from '@mdi/js'

/**
 * Global, static constants.
 */
export const Globals = Object.freeze({
  APP_NAME: 'fluidd',
  DEFAULTS: {
    CAMERA_URL: '/webcam?action=stream'
  },
  NETWORK_REQUEST_TIMEOUT: 500,
  KLIPPY_RETRY_DELAY: 1500,
  SOCKET_RETRY_DELAY: 2000,
  CONSOLE_HISTORY_RETENTION: 1000, // total count
  CONSOLE_RECEIVE_PREFIX: '',
  CONSOLE_SEND_PREFIX: '$ ',
  CONSOLE_COMMAND_HISTORY: 20,
  CHART_HISTORY_RETENTION: 1200,
  JOB_HISTORY_LOAD: 50,
  KLIPPY_DISCONNECTED_REDIRECT: '/configuration',
  LOCAL_CARDSTATE_STORAGE_KEY: 'cardState', // collapsed or not
  LOCAL_CARDLAYOUT_STORAGE_KEY: 'cardLayout2', // Specific layout / enabled / disabled
  LOCAL_INSTANCES_STORAGE_KEY: 'appInstances',
  MOONRAKER_DB: {
    NAMESPACE: 'fluidd',
    ROOTS: {
      uiSettings: { name: 'uiSettings', dispatch: 'config/initUiSettings' },
      macros: { name: 'macros', dispatch: 'macros/initMacros' },
      console: { name: 'console', dispatch: 'console/initConsole' },
      charts: { name: 'charts', dispatch: 'charts/initCharts' },
      cameras: { name: 'cameras', dispatch: 'cameras/initCameras' },
      layout: { name: 'layout', dispatch: 'layout/initLayout' }
    }
  },
  MOONRAKER_COMPONENTS: {
    power: { name: 'power', dispatch: 'power/init' },
    updateManager: { name: 'update_manager', dispatch: 'version/init' },
    history: { name: 'history', dispatch: 'history/init' }
  },
  FILTERED_FILES_PREFIX: ['thumbs'],
  FILTERED_FILES_EXTENSION: ['.ignoreme'],
  DOCS_ROOT: 'https://docs.fluidd.xyz',
  DOCS_REQUIRED_CONFIGURATION: 'https://docs.fluidd.xyz/configuration/initial_setup',
  DOCS_MULTIPLE_INSTANCES: 'https://docs.fluidd.xyz/configuration/multiple_printers',
  DOCS_MOONRAKER_COMPONENTS: 'https://docs.fluidd.xyz/configuration/moonraker',
  DOCS_KLIPPER_CONFIG_REF: 'https://www.klipper3d.org/Config_Reference.html',
  DOCS_MOONRAKER_CONFIG_REF: 'https://moonraker.readthedocs.io/en/latest/configuration/'
})

export const Icons = Object.freeze({
  help: mdiHelpCircle,
  motion: mdiMotionOutline,
  limits: mdiArrowHorizontalLock,
  send: mdiSend,
  open: mdiOpenInApp,
  tabs: mdiCheckboxMultipleBlank,
  menu: mdiDotsVertical,
  menuAlt: mdiMenuDown,
  dots: mdiDotsHorizontal,
  drag: mdiDrag,
  chart: mdiChartTimelineVariant,
  power: mdiPower,
  powerCycle: mdiPowerCycle,
  powerOn: mdiElectricSwitchClosed,
  powerOff: mdiElectricSwitch,
  home: mdiHome,
  close: mdiClose,
  refresh: mdiRefresh,
  restart: mdiRestart,
  restartAlert: mdiRestartAlert,
  update: mdiUpdate,
  alert: mdiAlert,
  thermometer: mdiThermometerLow,
  bell: mdiBellOutline,
  fireAlert: mdiFireAlert,
  snowflakeAlert: mdiSnowflakeAlert,
  blankCircle: mdiCheckboxBlankCircleOutline,
  markedCircle: mdiRadioboxMarked,
  checkedCircle: mdiCheckCircleOutline,
  checkboxBlank: mdiCheckboxBlankOutline,
  checkboxMarked: mdiCheckboxMarkedOutline,
  alertCircle: mdiAlertCircle,
  folderAdd: mdiFolderPlus,
  folderUp: mdiFolderUpload,
  folder: mdiFolder,
  fileUpload: mdiUpload,
  fileAdd: mdiFilePlus,
  progressUpload: mdiProgressUpload,
  up: mdiArrowUp,
  down: mdiArrowDown,
  left: mdiArrowLeft,
  right: mdiArrowRight,
  tune: mdiTune,
  zUp: mdiArrowExpandUp,
  zDown: mdiArrowCollapseDown,
  expandHorizontal: mdiArrowExpandHorizontal,
  cog: mdiCog,
  cogs: mdiCogs,
  save: mdiContentSaveOutline,
  estop: mdiCarBrakeAlert,
  fire: mdiFire,
  tools: mdiTools,
  minus: mdiMinus,
  plus: mdiPlus,
  check: mdiCheck,
  console: mdiConsole,
  clock: mdiClockOutline,
  filamentEstimate: mdiFormatLineSpacing,
  chevronUp: mdiChevronUp,
  chevronDown: mdiChevronDown,
  chevronRight: mdiChevronRight,
  chevronLeft: mdiChevronLeft,
  timer: mdiTimerSand,
  fileCode: mdiFileCodeOutline,
  files: mdiFileMultipleOutline,
  fileDocument: mdiFileDocumentOutline,
  file: mdiFile,
  pause: mdiPause,
  cancel: mdiWindowClose,
  resume: mdiPlayBoxOutline,
  reprint: mdiPrinter,
  printer: mdiPrinter,
  download: mdiDownload,
  rename: mdiFormTextbox,
  delete: mdiDelete,
  camera: mdiCamera,
  fan: mdiFan,
  pencil: mdiPencil,
  magnify: mdiMagnify,
  printer3d: mdiPrinter3d,
  printer3dNozzle: mdiPrinter3dNozzleOutline,
  printer3dNozzleAlert: mdiPrinter3dNozzleAlertOutline,
  bedMesh: mdiViewGridOutline,
  host: mdiDesktopTower,
  history: mdiHistory,
  filter: mdiFilterOutline,
  commit: mdiSourceCommit
})

export const Waits = Object.freeze({
  onServiceRestart: 'onServiceRestart',
  onDevicePowerToggle: 'onDevicePowerToggle',
  onHomeAll: 'onHomeAll',
  onHomeXY: 'onHomeXY',
  onHomeX: 'onHomeX',
  onHomeY: 'onHomeY',
  onHomeZ: 'onHomeZ',
  onQGL: 'onQGL',
  onZTilt: 'onZTilt',
  onBedScrewsAdjust: 'onBedScrewAdjust',
  onBedScrewsCalculate: 'onBedScrewsCalculate',
  onPrintPause: 'onPrintPause',
  onPrintCancel: 'onPrintCancel',
  onPrintResume: 'onPrintResume',
  onMacro: 'onMacro',
  onSetSpeed: 'onSetSpeed',
  onSetFlow: 'onSetFlow',
  onSetFanSpeed: 'onSetFanSpeed',
  onSetOutputPin: 'onSetOutputPin',
  onZAdjust: 'onZAdjust',
  onRetract: 'onRetract',
  onExtrude: 'onExtrude',
  onMeshCalibrate: 'onMeshCalibrate',
  onKlipperRestart: 'klipperRestart',
  onKlipperFirmwareRestart: 'klipperFirmwareRestart',
  onSetVelocity: 'onSetVelocity',
  onSetAcceleration: 'onSetAcceleration',
  onSetDeceleration: 'onSetDeceleration',
  onSetSCV: 'onSetSCV',
  onExtruderChange: 'onExtruderChange',
  onLoadLanguage: 'onLoadLanguage',
  onFileSystem: 'onFileSystem',
  onUpload: 'onUpload'
})

export const defaultPlotLayout = Object.freeze({
  showScale: true,
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  margin: {
    l: 0,
    r: 100,
    b: 0,
    t: 0
  },
  scene: {
    camera: {
      eye: {
        x: -1.25,
        y: -1.25,
        z: 0.5
      }
    },
    xaxis: {
      color: '#999',
      range: [0, 200]
    },
    yaxis: {
      color: '#999',
      range: [0, 200]
    },
    zaxis: {
      color: '#999',
      range: [-1, 1]
    }
  }
})
