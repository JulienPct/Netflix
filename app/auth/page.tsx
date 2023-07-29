"use client";

import Input from "@/components/input";
import { use, useCallback, useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, [])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="w-full h-full bg-black lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12"/>
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
                        <button className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700">
                            {variant === 'login' ? 'Se connecter' : 'S\'inscrire'}
                        </button>
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