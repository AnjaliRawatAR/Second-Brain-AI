import "../styles/BotAvatar.css";
import bot from "../assets/bot.svg";

export default function BotAvatar({ speaking }) {
  return (
    <div className={`bot-avatar ${speaking ? "speaking" : ""}`}>
      <img src={bot} alt="AI Bot" />
    </div>
  );
}
