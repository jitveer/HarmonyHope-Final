import React from "react";
import styles from "./Notification.module.css";
import { FaPlaneDeparture, FaGift, FaCarSide, FaHotel, FaTag } from "react-icons/fa";

const notifications = [
  {
    icon: <FaPlaneDeparture className={styles.iconPurple} />,
    text: "Reminder: You better be ready! flight is tomorrow at 9am",
    time: "24min ago",
  },
  {
    icon: <FaGift className={styles.iconGreen} />,
    text: "Reminder: You have 1 invitation tonight at 17pm",
    time: "2h 17min ago",
  },
  {
    icon: <FaHotel className={styles.iconOrange} />,
    text: "Reminder: There is only 1 day left to reserve your hotel room!",
    time: "Yesterday, 17:35 pm",
  },
  {
    icon: <FaCarSide className={styles.iconBlue} />,
    text: "Reminder: Your transfer from the hotel to airport at 5pm",
    time: "Sunday, 06:15 pm",
  },
  {
    icon: <FaTag className={styles.iconGray} />,
    text: "Offer: Off-Season will end in 20 Oct get it now!",
    time: "Oct, 18 2018",
  },
];

const Notifications = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notifications</h2>
      <div className={styles.list}>
        {notifications.map((item, index) => (
          <div key={index} className={styles.notificationItem}>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <div className={styles.textWrapper}>
              <p className={styles.text}>{item.text}</p>
              <span className={styles.time}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;