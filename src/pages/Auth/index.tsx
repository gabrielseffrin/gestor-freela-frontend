import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext.tsx";
import {Button} from "@/components/ui/button"
import {
    Card, CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

function LoginPage() {

    const navigate = useNavigate();
    const {login} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        console.log('Iniciando chamada para API...');

        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'teste@email.com' && password === '1234') {
                    resolve({
                        message: 'Login bem-sucedido!',
                        token: 'fake-jwt-token-12345'
                    });
                } else {
                    reject({message: 'Email ou senha inválidos.'});
                }
            }, 2000);
        })
            .then((response: any) => {
                login({email}, response.token);
                navigate('/dashboard');
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <form onSubmit={handleLogin}>
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button variant="link">Sign Up</Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required value={password}
                                       onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default LoginPage;