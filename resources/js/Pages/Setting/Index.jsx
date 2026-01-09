import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

export default function Index({ setting }) {

    const { data, setData, post, processing } = useForm({
        min_stock: setting.min_stock ?? 0,
        emails: setting.emails ?? [],
        new_email: '',
    });

    const addEmail = () => {
        if (!data.new_email) return;

        setData('emails', [...data.emails, data.new_email]);
        setData('new_email', '');
    };

    const removeEmail = (index) => {
        setData(
            'emails',
            data.emails.filter((_, i) => i !== index)
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('setting.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Inventory Setting */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-4">
                                Inventory
                            </h3>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum Stock
                            </label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                value={data.min_stock}
                                onChange={e => setData('min_stock', e.target.value)}
                            />
                        </div>

                        {/* Email Notification */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-4">
                                Email Notification
                            </h3>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="email"
                                    placeholder="Add email address"
                                    className="flex-1 border rounded px-3 py-2"
                                    value={data.new_email}
                                    onChange={e => setData('new_email', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={addEmail}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <ul className="space-y-2">
                                {data.emails.map((email, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center border rounded px-3 py-2"
                                    >
                                        <span>{email}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeEmail(index)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                Save Setting
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
