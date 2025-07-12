import React, { useEffect, useState } from "react";
import "./App.css";
import phoneImg from "./assets/phone.png";
import emailImg from "./assets/email.png";
import FloatingInput from "./components/FloatingInput";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [pin, setPin] = useState("");
  const [displayPin, setDisplayPin] = useState("");

  const handlePhoneChange = (value: string) => {
    // Work with digits without the custom parsing
    const digits = value.replace(/\D/g, "");
    let parsedPhone: string = "";

    if (digits.length >= 7) {
      parsedPhone =
        "(" +
        digits.slice(0, 3) +
        ")" +
        digits.slice(3, 6) +
        "-" +
        digits.slice(6, 10);
    } else if (digits.length > 3) {
      parsedPhone = "(" + digits.slice(0, 3) + ")" + digits.slice(3);
    } else {
      parsedPhone = digits;
    }

    setPhoneNumber(parsedPhone);
  };

  const handlePriceChange = (value: string) => {
    // Replace anything that is not 0-9 or a period
    let sanitizedPrice = value.replace(/[^0-9.]/g, "");
    const lastPeriodIndex = sanitizedPrice.lastIndexOf(".");

    if (lastPeriodIndex !== -1) {
      // From index 0 but not including last period index, remove all the periods
      sanitizedPrice =
        sanitizedPrice.slice(0, lastPeriodIndex).replace(/\./g, "") +
        sanitizedPrice.slice(lastPeriodIndex);

      // If the # of digits past the last period is bigger than 2, keep first 2 after period
      if (sanitizedPrice.length - lastPeriodIndex + 1 > 2) {
        sanitizedPrice = sanitizedPrice.slice(0, lastPeriodIndex + 3);
      }
    }

    setPrice("$" + sanitizedPrice);
  };

  const handlePinChange = (value: string) => {
    // Calculate raw count of masked characters
    const displayRaw = displayPin.replace(/[^#]/g, "");
    const valueRaw = value.replace(/[^#]/g, "");

    if (valueRaw.length < displayRaw.length) {
      setPin(pin.slice(0, pin.length - 1));
    } else {
      if (pin.length >= 16) return;

      setPin(pin + value[value.length - 1]);
    }
  };

  // Need to update pin then displayPin, can't do both concurrently
  useEffect(() => {
    maskPin(pin);
  }, [pin]);

  const maskPin = (pin: string) => {
    const trimmedPin = pin.slice(0, 16);
    let maskedPin = "";

    for (let i = 0; i < trimmedPin.length; i++) {
      if (i > 0 && i % 4 == 0) {
        maskedPin += "-";
      }

      maskedPin += "#";
    }

    setDisplayPin(maskedPin);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Note: Input is not being checked for validilty

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Phone Number: " + phoneNumber);
    console.log("Email: " + email);
    console.log("Guess: " + price);
    console.log("Spidr Pin: " + pin);
  };

  return (
    <>
      <div className="canvas">
        <img src="https://spidr.design/build/images/final-spidr-logo.png"></img>

        <h1 className="formTitle">Air Fryer Raffle</h1>

        <form className="form" onSubmit={handleSubmit}>
          <FloatingInput
            id="firstName"
            value={firstName}
            onChange={setFirstName}
            label="First name"
          ></FloatingInput>

          <FloatingInput
            id="lastName"
            value={lastName}
            onChange={setLastName}
            label="Last name"
          ></FloatingInput>

          <FloatingInput
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneChange}
            label="Phone number"
            icon={<img src={phoneImg}></img>}
          ></FloatingInput>

          <FloatingInput
            id="email"
            value={email}
            onChange={setEmail}
            label="Email"
            icon={<img src={emailImg}></img>}
          ></FloatingInput>

          <FloatingInput
            id="price"
            value={price}
            onChange={handlePriceChange}
            label="Guess Cost of Air Fryer"
            color="#8AFFC1"
          ></FloatingInput>

          <FloatingInput
            id="pin"
            value={displayPin}
            onChange={handlePinChange}
            label="Spidr Pin"
            color="#F87666"
          ></FloatingInput>

          <button className="btnSubmit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
