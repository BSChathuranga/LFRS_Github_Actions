import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useCreateFoundReportsMutation, useGetCategoriesQuery } from "@/lib/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function FoundReport() {

    const [crateFoundReport, { isLoading, isError, error, isSuccess }] = useCreateFoundReportsMutation()
    const { data: categoriesList } = useGetCategoriesQuery();

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [nic, setNIC] = useState('')
    const [items, setItems] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState([]);
    const [dateOfFound, setDateOfFound] = useState('')
    const [timeOfFound, setTimeOfFound] = useState('')
    const [location, setLocation] = useState('')
    const [district, setDistrict] = useState('')
    const [nearestPoliceStation, setNearestPoliceStation] = useState('')


    //const [images, setImages] = useState([]);

    const [categoryDisplay, setCategoryDisplay] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPhoneNo('')
            setNIC('')
            setItems('')
            setDescription('')
            setImages([])
            setCategory([])
            setDateOfFound('')
            setTimeOfFound('')
            setLocation('')
            setDistrict('')
            setNearestPoliceStation('')
            navigate('/reports')
            window.location.reload()
            toast.success('Your has been successfully created found report.')

        }
    }, [isSuccess, navigate])

    useEffect(() => {
        if (isError) {
            toast.error(error?.message || 'Failed to create found report, please try again')
        }
    }, [isError, error])


    const handleNameChange = (e) => setName(e.target.value)
    const handlePhoneNoChange = (e) => setPhoneNo(e.target.value)
    const handleNICChange = (e) => setNIC(e.target.value)
    const handleItemsChange = (e) => setItems(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleImageChange = (e) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)])
        }
    }

    const handleCategoryChangeValue = (e) => {
        const value = e.target.value;
        if (!value.includes(category)) {
            setCategory(value);
        }
    }
    const handleDateOfFoundChange = (e) => setDateOfFound(e.target.value)
    const handleTimeOfFoundChange = (e) => setTimeOfFound(e.target.value)
    const handleLocationChange = (e) => setLocation(e.target.value)
    const handleDistricChange = (e) => setDistrict(e.target.value)
    const handleNearestPoliceStationChange = (e) => setNearestPoliceStation(e.target.value)


    const canSave = [name,
        phoneNo,
        nic,
        items,
        description,
        images,
        category,
        dateOfFound,
        timeOfFound,
        district,
        location,
        nearestPoliceStation]
        .every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (canSave) {
            await crateFoundReport({
                name,
                phoneNo,
                nic,
                items,
                description,
                images,
                category,
                dateOfFound,
                timeOfFound,
                district,
                location,
                nearestPoliceStation
            })
        }
    }

    const handleCategoryChange = (e) => {
        const value = [e.target.value];
        if (!value.includes(category)) {
            setCategoryDisplay([...categoryDisplay, value]);
        }
    }

    return (
        <section className="py-12 bg-blue-50 flex justify-center backdrop:blur-md">
            <form action="" method="POST" onSubmit={handleSubmit} className="bg-slate-100 rounded-xl px-4 py-8 max-w-[800px] shadow-2xl">
                <h2 className="text-2xl font-bold text-blue-950 pb-4">Found Item Report</h2>

                <label className="font-semibold" htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={handleNameChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="phoneNo">Phone Number</label><br />
                        <input
                            type="tel"
                            id="phoneNo"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                            placeholder="Enter your phone number"
                            required
                            value={phoneNo}
                            onChange={handlePhoneNoChange}
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="nic">NIC</label><br />
                        <input
                            type="text"
                            id="nic" className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                            placeholder="Enter your NIC number"
                            required
                            value={nic}
                            onChange={handleNICChange}
                        />
                    </div>
                </div>


                <label className="font-semibold" htmlFor="items">Found Items</label>
                <textarea
                    id="items"
                    className="w-full h-40 px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                    placeholder="Enter the lost items"
                    required
                    value={items}
                    onChange={handleItemsChange}
                >

                </textarea>

                <label className="font-semibold" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="w-full h-40 px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                    placeholder="Enter a detailed description"
                    value={description}
                    onChange={handleDescriptionChange}
                >
                </textarea>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 sm:mr-0">
                        <label className="font-semibold" htmlFor="image">Images</label>
                        <input
                            type="file"
                            id="image"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                        />
                        <div className="flex pt-0  gap-4 relative">
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img src={URL.createObjectURL(image)} alt="" className="w-auto h-16 object-cover rounded-md" />
                                    <button
                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                        className="absolute right-68 bottom-0 mb-1 z-50 bg-rose-600 opacity-70 p-1 rounded-full"
                                    >
                                        <IoTrashBinSharp className="text-xs" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="category">Categories</label><br />
                        <select
                            name="category"
                            id="category"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600"
                            value={category}
                            onChange={(e) => {
                                handleCategoryChange(e)
                                handleCategoryChangeValue(e)
                            }}

                        ><option value="">Select a category</option>


                            {
                                categoriesList?.map((category) => {
                                    return (
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    )
                                }
                                )
                            }

                        </select><br />
                        <div className="pb-4 flex flex-wrap gap-2">
                            {categoryDisplay?.map((c, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-blue-500 text-white rounded-md">
                                        <AiTwotoneCloseCircle
                                            className="text-slate-900 opacity-55 cursor-pointer float-left mt-1 mr-2 hover:opacity-100"
                                            onClick={() => setCategoryDisplay(categoryDisplay.filter((_, i) => i !== index))}
                                        />
                                        {c}

                                    </span>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="dateOfFound">Date of Found</label>
                        <input
                            type="date"
                            id="dateOfFound"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                            required
                            value={dateOfFound}
                            onChange={handleDateOfFoundChange}
                        />

                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="timeOfFound">Time of Found</label>
                        <input 
                        type="time" 
                        id="timeOfFound" 
                        className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline-none focus:outline-blue-600"
                        required
                        value={timeOfFound}
                        onChange={handleTimeOfFoundChange}
                        />
                    </div>
                </div>

                <label className="font-semibold" htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600"
                    placeholder="Enter the location of the lost item"
                    required
                    value={location}
                    onChange={handleLocationChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-4 ms:mr-0">
                        <label className="font-semibold" htmlFor="distric">Distric</label><br />
                        <select
                            name="distric"
                            id="distric"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600"
                            value={district}
                            onChange={handleDistricChange}
                        >
                            <option value="">Select a district</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Matale">Matale</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Vavuniya">Vavuniya</option>
                            <option value="Puttalam">Puttalam</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold " htmlFor="nearestPoliceStation">Nearest Police Station</label>
                        <select
                            name="nearestPoliceStation"
                            id="nearestPoliceStation"
                            className="w-full px-3 py-2 mb-4 text-sm border-gray-300 rounded-md focus:outline focus:outline-blue-600"
                            value={nearestPoliceStation}
                            onChange={handleNearestPoliceStationChange}
                        >
                            <option value="">Select a police station</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Anuradhapura">Anuradhapura</option>

                        </select>
                    </div>
                </div>

                <div className="flex justify-center py-6">
                    <Button type="submit" disabled={!canSave} >Submit Lost Report</Button>
                </div>

            </form>

        </section>
    );
}

export default FoundReport;