import { useEffect, useState } from 'react';

const BASE_URL = 'https://randomuser.me/api';

function App() {
    const [userData, setUserData] = useState(null);
    const [userNum, setUserNum] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            try {
                setError(false);
                const response = await fetch(`${BASE_URL}/?page=${userNum}`);
                const result = await response.json();
                if (!result.results || !result.results.length)
                    throw new Error('No results');
                setUserData(result.results[0]);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getUser();
    }, [userNum]);

    const handleNextUser = () => {
        setUserNum((n) => n + 1);
        console.log('click');
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh bg-gray-200">
            {error ? (
                <>
                    <p>Error. Please try again!</p>
                    <button
                        onClick={handleNextUser}
                        disabled={isLoading}
                        className={`mt-6 bg-gray-600 hover:bg-gray-500  p-3 font-semibold text-white text-md rounded-2xl ${
                            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                        }
                        
                        ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                    >
                        {isLoading ? 'Loading...' : 'Retry'}
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center bg-gray-400 p-6 rounded-lg shadow-2xl min-w-xs">
                    <div className="flex flex-col items-center gap-1 text-white">
                        <img
                            src={userData?.picture.large}
                            alt="profile picture"
                            className="mb-3 rounded-full"
                        />

                        <p className="font-black text-xl">
                            {userData?.name.first} {userData?.name.last}
                        </p>
                        <p>{userData?.email}</p>
                    </div>
                    <button
                        onClick={handleNextUser}
                        disabled={isLoading}
                        className={`mt-6 bg-gray-600 hover:bg-gray-500  p-3 font-semibold text-white text-md rounded-2xl ${
                            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                        }
                        
                        ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                    >
                        {isLoading ? 'Loading...' : 'Next User'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
