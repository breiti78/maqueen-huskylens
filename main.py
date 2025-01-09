def on_button_pressed_a():
    pass
input.on_button_pressed(Button.A, on_button_pressed_a)

winkel = 0
Maqueen_V5.servo_run(Maqueen_V5.Servos.S1, winkel)

def on_forever():
    Maqueen_V5.servo_run(Maqueen_V5.Servos.S1, 0)
    basic.pause(800)
    Maqueen_V5.servo_run(Maqueen_V5.Servos.S1, 180)
    basic.pause(800)
basic.forever(on_forever)
