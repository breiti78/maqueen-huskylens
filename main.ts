function InitRobo () {
    InitGripper()
    initLights()
}
input.onButtonPressed(Button.A, function () {
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperOpen)
})
input.onButtonPressed(Button.B, function () {
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperClosed)
})
function initLights () {
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
}
function initVariables () {
    GripperClosed = 170
    GripperOpen += 120
}
function InitGripper () {
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperOpen)
    basic.pause(500)
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperClosed)
    basic.pause(500)
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperOpen)
    basic.pause(500)
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperClosed)
    basic.pause(500)
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperOpen)
}
let strip: neopixel.Strip = null
let GripperClosed = 0
let GripperOpen = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
initVariables()
InitRobo()
basic.forever(function () {
    huskylens.request()
    while (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        serial.writeValue("Status", 1)
        serial.writeValue("width", huskylens.readeBox(1, Content1.width))
        serial.writeValue("height", huskylens.readeBox(1, Content1.height))
        serial.writeValue("ID", huskylens.readArrow_s(Content4.ID))
        if (huskylens.readeBox(1, Content1.width) > 200) {
            Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperOpen)
        } else {
            Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, GripperClosed)
        }
    }
    serial.writeValue("Status", 0)
})
