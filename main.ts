bluetooth.onBluetoothConnected(function () {
    connected = 1
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
    basic.showString("D")
    Rover.MotorStopAll(MotorActions.Stop)
})
input.onButtonPressed(Button.A, function () {
    music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once)
})
function LightTracing222222222 () {
    LightingValue = Rover.LightTracing()
    bluetooth.uartWriteString(Rover.SendString(Orders.LIGHTING, LightingValue))
    difValue = LightingValue - centerValue
    if (difValue > 20) {
        Rover.MotorRunDual(150, 0)
    } else if (difValue < -20) {
        Rover.MotorRunDual(0, 150)
    } else {
        Rover.Move(100)
    }
}
function LineTracking2222 () {
    trackingValues = Rover.LineTracking()
    bluetooth.uartWriteString(Rover.SendString(Orders.TRACKING, trackingValues))
    if (trackingValues == 2 || trackingValues == 5) {
        Rover.Move(trackingSpeed)
    } else if (trackingValues == 4 || trackingValues == 6) {
        Rover.MotorRunDual(speedSlowSide, speedFastSide)
    } else if (trackingValues == 1 || trackingValues == 3) {
        Rover.MotorRunDual(speedFastSide, speedSlowSide)
    } else {
        Rover.MotorStopAll(MotorActions.Stop)
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    Rover.setReceiveString(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
    if (Rover.checkOrder(Orders.MOVE)) {
        Rover.MotorRunDual(Rover.getParameter(0), Rover.getParameter(1))
    } else if (Rover.checkOrder(Orders.STOP)) {
        Rover.MotorStopAll(MotorActions.Stop)
    } else if (Rover.checkOrder(Orders.ORDER_RGB)) {
        Rover.setRGBLED(Rover.getParameter(0), Rover.rgb(Rover.getParameter(1), Rover.getParameter(2), Rover.getParameter(3)))
    } else if (Rover.checkOrder(Orders.BUZZER)) {
        music.ringTone(Rover.getParameter(0))
    } else if (Rover.checkOrder(Orders.VOLTAGE)) {
        bluetooth.uartWriteString(Rover.SendString(Orders.VOLTAGE, Rover.BatteryLevel()))
    } else if (Rover.checkOrder(Orders.MODE)) {
        Rover.setRoverMode(Rover.getParameter(0))
    } else {
    	
    }
})
function Obstacleavoidance2222222 () {
    SonicDistance = Rover.Ultrasonic()
    bluetooth.uartWriteString(Rover.SendString(Orders.DISTANCE, SonicDistance))
    if (SonicDistance <= 15) {
        Rover.MotorRunDual(-100, 100)
    } else {
        Rover.Move(100)
    }
}
input.onButtonPressed(Button.AB, function () {
    music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
})
input.onButtonPressed(Button.B, function () {
    music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once)
})
let SonicDistance = 0
let trackingValues = 0
let difValue = 0
let LightingValue = 0
let speedFastSide = 0
let speedSlowSide = 0
let trackingSpeed = 0
let connected = 0
let centerValue = 0
let sumValue = 0
bluetooth.startUartService()
for (let index = 0; index <= 9; index++) {
    sumValue = sumValue + Rover.LightTracing()
}
centerValue = Math.round(sumValue / 10)
basic.showIcon(IconNames.Happy)
music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
connected = 0
trackingSpeed = 100
speedSlowSide = 30
speedFastSide = 100
basic.forever(function () {
    if (Rover.checkMode(RoverModes.Mode_ObstacleAvoidance)) {
        Obstacleavoidance2222222()
    } else if (Rover.checkMode(RoverModes.Mode_None)) {
        Rover.MotorStopAll(MotorActions.Stop)
        Rover.setRoverMode(Rover.rover_mode_export(RoverModes.Mode_Remote))
    } else if (Rover.checkMode(RoverModes.Mode_LightTracing)) {
        LightTracing222222222()
    } else if (Rover.checkMode(RoverModes.Mode_LineTracking)) {
        LineTracking2222()
    } else {
    	
    }
})
