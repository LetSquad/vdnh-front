import styles from "./styles/Socials.module.scss";

const socials = [
    {
        link: "https://vk.com/vdnh",
        className: styles.socialsLinkVk,
        name: "VK"
    }, {
        link: "https://ok.ru/vdnh",
        className: styles.socialsLinkOk,
        name: "OK"
    }, {
        link: "https://www.youtube.com/channel/UC7jhb9mhk9ZQE719pFfe-vg",
        className: styles.socialsLinkYt,
        name: "YouTube"
    }, {
        link: "https://zen.yandex.ru/vdnh",
        className: styles.socialsLinkZen,
        name: "Zen"
    }, {
        link: "https://t.me/vdnh_moscow",
        className: styles.socialsLinkTg,
        name: "Telegram"
    }
];

export default function Socials() {
    return (
        <div>
            {socials.map((social) => (
                <a
                    key={social.name}
                    className={social.className}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {social.name}
                </a>
            ))}
        </div>
    );
}
