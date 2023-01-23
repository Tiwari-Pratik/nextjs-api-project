import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const inputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = inputRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for Newsletter.",
      status: "pending",
    });
    console.log("sending email");
    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("res successful");
          return res.json();
        }
        return res.json().then((data) => {
          console.log("res unsuccessful");
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        console.log("Error");
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
