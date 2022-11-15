import { useTranslation } from "react-i18next";

import SecondaryButton from "@parts/Buttons/SecondaryButton";
import loyaltyProgram from "@static/images/png/loyaltyProgram.png";

import styles from "./styles/LoyaltyProgram.module.scss";

export default function LoyaltyProgram() {
    const { t } = useTranslation("base");

    return (
        <div className={styles.banner}>
            <img
                src={loyaltyProgram}
                alt="loyaltyProgram"
            />
            <SecondaryButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://vdnh.ru/visitors/loyalty/"
            >
                {t("base:loyaltyProgram.getDiscount")}
            </SecondaryButton>
            <span className={styles.description}>{t("base:loyaltyProgram.description")}</span>
        </div>
    );
}
