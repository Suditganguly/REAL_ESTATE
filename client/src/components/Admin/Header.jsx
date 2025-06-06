import { useState } from 'react';

export default function Header() {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Admin',
        email: 'admin@example.com',
        phone: '',
        address: '',
        bio: 'Administrator of the dashboard',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setShowProfileModal(false);
        console.log('Updated profile:', profile);
    };

    return (
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-8 py-4 border-b border-gray-200 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileModal(true)}>
                <img src="https://i.pravatar.cc/40" alt="Avatar" className="w-10 h-10 rounded-full" />
                <span className="font-medium text-gray-800 dark:text-white">{profile.name}</span>
            </div>

            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[100]" onClick={() => setShowProfileModal(false)}>
                    <div
                        className="bg-white dark:bg-gray-800 p-8 rounded-lg w-[350px] max-w-[90%] shadow-xl animate-fade-in relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Edit Profile</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Full Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Bio:</label>
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition duration-200"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}
