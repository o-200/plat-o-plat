import Link from "next/link";
import { Logo } from "../logo";
import { ThemeSwitcher } from "../theme-button";
import { UserMenu } from "../user-menu/index";

const listItems = [
    {
        id: '1',
        label: '+7 (391) 275-53-53',
        href: 'tel:+73912755353'
    },
    {
        id: '2',
        label: 'ПН - ПТ с 10:00 до 17:00'
    },
    {
        id: '3',
        label: 'Обеденный перерыв с 13.00 до 14.00'
    }
]

const handleLogin = (data: {
    phone: string;
    deliveryMethod: string;
}) => {
    console.log("Login data:", data);
};
const handleRegister = (data: {
    name: string;
    phone: string;
    deliveryMethod: string;
}) => {
    console.log("Register data:", data);
};


export const NavbarDesktop = () => (
    <nav className="fixed top-0 left-0 right-0 m-auto backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 shadow-md z-50 w-[75%] rounded-b-[1rem] border-1 border-b-white border-x-white" >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
            <Link href="/">
                <Logo />
            </Link>
            <ul>
                {listItems.map(({ id, label, href }) =>
                    <li key={id}><a href={href}>{label}</a></li>
                )}
            </ul>
            <div className="flex items-center gap-4">
                <UserMenu
                    showThemeSwitcher={false}
                    user={{ isLoggedIn: false }}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                />
                <ThemeSwitcher />
            </div>
        </div>
    </nav >
)