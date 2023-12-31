import Image from "next/image";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Input from "@/components/Input";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, [])

    const login = useCallback(async () => {
        try {
            await signIn(
                'credentials', {
                    email,
                    password,
                    callbackUrl: '/profiles'
                }
            );
        } catch (error) {
            console.log(error);
        }
    }, [email, password])

    const register = useCallback(async () => {
        try{
            await axios.post('/api/register', {
                email,
                name,
                password
            });

            login();
        } catch (error) {
                console.log(error);
        }
    }, [email, name, password, login]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="w-full h-full bg-black lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" alt="Logo" className="h-12" width={200} height={60}/>
                </nav>
                <div className="flex justify-center">
                    <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-md">
                        <h2 className="mb-8 text-4xl font-semibold text-white">
                            {variant === 'login' ? 'Connexion' : 'Inscription'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input 
                                    label={'Nom d\'utilisateur'} 
                                    onChange={(e: any) => setName(e.target.value)}
                                    id='name'
                                    value={name}
                                />
                            )}
                        
                            <Input 
                                label={'Email'} 
                                onChange={(e: any) => setEmail(e.target.value)}
                                id='email'
                                type='email'
                                value={email}
                            />
                            <Input 
                                label={'Mot de passe'} 
                                onChange={(e: any) => setPassword(e.target.value)}
                                id='password'
                                type='password'
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700">
                            {variant === 'login' ? 'Se connecter' : 'S\'inscrire'}
                        </button>
                        <div className="flex flex-row items-center justify-center gap-4 mt-8">
                            <div 
                                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                            >
                                <FcGoogle size={30}/>
                            </div>
                            <div 
                                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                            >
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="mt-12 text-neutral-500">
                            {variant === 'login' ? 'Nouveau sur Netflix ?' : 'Vous avez déjà un compte ?'}
                            <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                                {variant === 'login' ? 'Inscrivez-vous maintenant' : 'Connectez-vous maintenant'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;