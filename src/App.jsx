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
        <div>
            <div>
                {error ? null : (<img src={userData?.picture.medium} alt="profile picture" />)}
                <p>
                    {userData?.name.first} {userData?.name.last}
                </p>
                <p>{userData?.email}</p>
                <p>{userData?.phone}</p>
            </div>
            <button onClick={handleNextUser} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Next User'}
            </button>
            {error ? <p>Error. Please try again!</p> : null}
        </div>
    );
}

export default App;
