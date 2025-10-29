import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/shadcn/dialog"
import { Button } from "@/components/ui/shadcn/button"
import { motion, AnimatePresence } from "framer-motion"
import LoginComponent from "./login"
import RegisterComponent from "./register"

interface UserModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (data: any) => void
    onRegister: (data: any) => void
}

export const UserModal: React.FC<UserModalProps> = ({
    isOpen,
    onClose,
    onLogin,
    onRegister,
}) => {
    const [view, setView] = useState<"initial" | "login" | "register">("initial")

    const handleBack = () => setView("initial")

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTitle></DialogTitle>
            <DialogContent
                className="max-w-6xl p-0 overflow-hidden rounded-2xl shadow-lg border border-border/40 backdrop-blur-xl bg-background/90"
            >
                <AnimatePresence mode="wait">
                    {view === "initial" && (
                        <motion.div
                            key="initial"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex flex-col md:flex-row"
                        >
                            {/* <div className="w-full md:w-2/5 flex-shrink-0 hidden md:block">
                                <img
                                    src="images/login.svg"
                                    alt="Login Illustration"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div> */}
                            <div className="w-full p-10 sm:p-14 flex items-center justify-center">
                                <div className="flex flex-col items-center md:items-start space-y-6">
                                    <DialogTitle className="text-3xl font-bold text-center md:text-left">
                                        Легко оплатить любую услугу
                                    </DialogTitle>
                                    <h2 className="text-lg text-center md:text-left text-muted-foreground">
                                        Начните пользоваться нашим сервисом уже сегодня
                                    </h2>
                                    <Button
                                        variant="default"
                                        onClick={() => setView("login")}
                                        className="w-full text-base py-5 px-6 text-center"
                                    >
                                        Войти
                                    </Button>
                                    <h2 className="text-lg text-center md:text-left text-muted-foreground">
                                        Вы ещё не с нами?
                                    </h2>
                                    <Button
                                        variant="outline"
                                        onClick={() => setView("register")}
                                        className="w-full text-base py-5 px-6 text-center"
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {view === "login" && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="p-10 sm:p-14"
                        >
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                className="mb-6 text-base text-black py-3 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
                            >
                                ← Вернуться
                            </Button>
                            <LoginComponent onSubmit={onLogin} onClose={onClose} />
                        </motion.div>
                    )}

                    {view === "register" && (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="p-10 sm:p-14"
                        >
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                className="mb-6 text-base text-black py-3 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
                            >
                                ← Вернуться
                            </Button>
                            <RegisterComponent onSubmit={onRegister} onClose={onClose} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
