'use client';

import { useState } from 'react';
import styles from './HamburgerButton.module.scss';

type Props = {
    onClick: () => void;
    className?: string;
};

export default function HamburgerButton({ onClick, className }: Props) {
    const [hover, setHover] = useState(false);

    return (
        <button
            className={`${styles.btn} ${className ?? ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
        >
            <span className={styles.line} />
            <span
                className={`${styles.line} ${styles.middle} ${
                    hover ? styles.middleEnter : styles.middleLeave
                }`}
            />
            <span className={`${styles.line}`} />
        </button>
    );
}
