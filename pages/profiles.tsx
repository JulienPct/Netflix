import useCurrentUser from "@/hooks/useCurrentUsers";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

const Profiles = () => {
    const router = useRouter();
    const { data: user } = useCurrentUser();

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col">
                <h1 className="text-3xl text-center text-white md:text-6xl">Qui est-ce ?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        <div className="flex-row mx-auto group w-44">
                            <div className="flex items-center justify-center overflow-hidden border-2 border-transparent rounded-md w-44 h-44 group-hover:cursor-pointer group-hover:border-white">
                                <Image src="/images/default-green.png" alt="Profil" width={200} height={200}/>
                            </div>
                            <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profiles;