/*
 * spark-eoh-demo
 * Kashev Dalmia - kashev.dalmia@gmail.com
 */

/*
 * isValid
 *     given an integer pin number, validate it as a pin that can be written to.
 */
bool
isValid(int pin_number)
{
    if (pin_number < D0 ||
        (pin_number > D7 && pin_number < A0) ||
        pin_number > A7)
    {
        return false;
    }
    else
    {
        return true;
    }
}


/*
 * string2pin
 *     given a string containing a pin name, validate it as an output pin
 *     and return the pin number.
 */
int
string2pin(String pin_string)
{
    int pin_number = 0;

    if (pin_string.length() != 2)
    {
        return -1;
    }

    switch (pin_string.charAt(0))
    {
        case 'D':
        case 'd':
            break;
        case 'A':
        case 'a':
            pin_number += A0;
            break;
        default:
            return -1;
    }

    char pin = pin_string.charAt(1);
    if (pin > '9' || pin < '0')
    {
        return -1;
    }
    else
    {
        pin_number += (static_cast<int>(pin - '0'));
    }

    if (isValid(pin_number))
    {
        return pin_number;
    }
    else
    {
        return -1;
    }
}


int
ledControl(String cmd)
{
    int state = -1;
    int pin_number = string2pin(cmd.substring(0, 2));

    if (pin_number < 0)
    {
        return -1;
    }

    if(cmd.substring(3,7) == "HIGH")
    {
        state = HIGH;
    }
    else if (cmd.substring(3, 6) == "LOW")
    {
        state = LOW;
    }
    else
    {
        return -1;
    }

    digitalWrite(pin_number, state);

    return 0;
}


/*
 * setup
 *     Code which runs once.
 */
void
setup(void)
{
    /*
     * Pin modes.
     */
    pinMode(D0, OUTPUT);
    pinMode(D1, OUTPUT);
    pinMode(D2, OUTPUT);
    pinMode(D3, OUTPUT);
    pinMode(D4, OUTPUT);
    pinMode(D5, OUTPUT);
    pinMode(D6, OUTPUT);
    pinMode(D7, OUTPUT);

    pinMode(A0, OUTPUT);
    pinMode(A1, OUTPUT);
    pinMode(A2, OUTPUT);
    pinMode(A3, OUTPUT);
    pinMode(A4, OUTPUT);
    pinMode(A5, OUTPUT);
    pinMode(A6, OUTPUT);
    pinMode(A7, OUTPUT);

    /*
     * External API
     */
    Spark.function("led", ledControl);
}

/*
 * loop
 *     Code which runs repeatedly.
 */
void
loop(void)
{
    /*
     * Pass
     */
}
