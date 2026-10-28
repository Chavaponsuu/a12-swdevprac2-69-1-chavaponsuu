"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import dayjs, { type Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";
import { addBooking } from "@/redux/features/bookSlice";
import type { AppDispatch } from "@/redux/store";
import styles from "./page.module.css";

export default function BookingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [error, setError] = useState("");

  function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nameLastname = String(formData.get("Name-Lastname") ?? "").trim();
    const tel = String(formData.get("Contact-Number") ?? "").trim();

    if (!nameLastname || !tel || !venue || !date?.isValid()) {
      setError("Please enter your name, contact number, venue, and a valid event date.");
      return;
    }

    dispatch(addBooking({ nameLastname, tel, venue, bookDate: date.format("YYYY/MM/DD") }));
    setError("");
    router.push("/mybooking");
  }

  return (
    <main className={styles.page}>
      <div className={styles.bookingCard}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Book a Venue</h1>
          <p className={styles.description}>
            Fill in the details below to reserve your venue.
          </p>
        </div>

        <hr className={styles.divider} />

        <form className={styles.form} onSubmit={handleBooking}>
          <DateReserve
            venue={venue}
            date={date}
            onVenueChange={setVenue}
            onDateChange={setDate}
          />

          {error && <p role="alert" className={styles.formError}>{error}</p>}

          <button
            name="Book Venue"
            type="submit"
            className={styles.bookButton}
          >
            Book Venue
          </button>
        </form>
      </div>
    </main>
  );
}
