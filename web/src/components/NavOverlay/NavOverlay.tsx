import styles from "./NavOverlay.module.css";
import XSVG from "./x-symbol.svg";

interface NavOverlayProps {
    toggleOverlay: () => void;
}

export default ({ toggleOverlay }: NavOverlayProps) => {
    const handleOverlayToggle = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            toggleOverlay()
        }
    }
    
    return (
        <div id={styles.navOverlay} onClick={handleOverlayToggle}>
            <div id={styles.navOverlayMenu}>
                <div id={styles.overlayHeader}>
                    <div id={styles.closeContainer}>
                        <button>
                            <XSVG />
                        </button>
                    </div>
                </div>
                <hr />
                <div id={styles.overlayBody}></div>
            </div>
        </div>
    )
}