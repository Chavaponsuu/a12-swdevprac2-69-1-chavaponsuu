"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import styles from "./booking-list.module.css";

const venueNames: Record<string, string> = {
  Bloom: "The Bloom Pavilion",
  Spark: "Spark Space",
  GrandTable: "The Grand Table",
};

export default function BookingList() {
  const bookings = useSelector((state: RootState) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  if (bookings.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No Venue Booking</p>
        <Link href="/booking" className={styles.bookingLink}>Book a Venue</Link>
      </div>
    );
  }

  return (
    <ul className={styles.list} aria-label="Venue bookings">
      {bookings.map((booking) => (
        <li key={`${booking.venue}-${booking.bookDate}`} className={styles.card}>
          <h2>{venueNames[booking.venue] ?? booking.venue}</h2>
          <dl className={styles.details}>
            <dt>Name-Lastname</dt>
            <dd>{booking.nameLastname}</dd>
            <dt>Contact-Number</dt>
            <dd>{booking.tel}</dd>
            <dt>Event Date</dt>
            <dd><time dateTime={booking.bookDate.replaceAll("/", "-")}>{booking.bookDate}</time></dd>
          </dl>
          <button
            type="button"
            className={styles.cancelButton}
            aria-label={`Cancel booking for ${booking.venue} on ${booking.bookDate}`}
            onClick={() => dispatch(removeBooking(booking))}
          >
            Cancel Booking
          </button>
        </li>
      ))}
    </ul>
  );
}
