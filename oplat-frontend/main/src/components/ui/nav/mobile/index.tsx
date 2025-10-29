import { Logo } from "../logo";
import { ReportButton } from "../report-button";
import { UserMenu } from "../user-menu";

export const NavbarMobile = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border-t border-gray-200 dark:border-neutral-700 z-50">
        <div className="flex justify-between items-center px-2 py-2">
            <Logo />
            <UserMenu showThemeSwitcher classNameWrapper="self-center flex items-center" />
            <ReportButton className="self-center" />
        </div>
    </nav>
)