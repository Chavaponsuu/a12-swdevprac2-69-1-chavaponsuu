import BookingList from "@/components/BookingList";
import styles from "./page.module.css";

export default function MyBookingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>My Booking</h1>
        <BookingList />
      </div>
    </main>
  );
}
