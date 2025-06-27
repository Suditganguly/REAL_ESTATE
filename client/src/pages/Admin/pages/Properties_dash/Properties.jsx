// import Header from "../../components/Header";
// import React, { useState } from "react";

// const initialProperties = [
//   {
//     id: 1,
//     name: "Modern Apartment",
//     location: "New York",
//     price: "$1,200,000",
//     status: "Available",
//   },
//   {
//     id: 2,
//     name: "Beach House",
//     location: "LA",
//     price: "$2,000,000",
//     status: "Sold",
//   },
// ];

// export default function Properties() {
//   const [properties, setProperties] = useState(initialProperties);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     location: "",
//     price: "",
//     status: "Available",
//   });

//   const handleEdit = (property) => {
//     setEditingId(property.id);
//     setEditForm({ ...property });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     const updated = properties.map((item) =>
//       item.id === editingId ? { ...editForm, id: editingId } : item
//     );
//     setProperties(updated);
//     setEditingId(null);
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//   };

//   const handleDelete = (id) => {
//     setProperties(properties.filter((item) => item.id !== id));
//   };

//   const handleAddProperty = () => {
//     const newProperty = {
//       id: Date.now(),
//       name: "New Property",
//       location: "New City",
//       price: "$0",
//       status: "Available",
//     };
//     setProperties([...properties, newProperty]);
//   };

//   const statusBadgeStyle = (status) => ({
//     padding: "4px 8px",
//     borderRadius: "9999px",
//     fontSize: "12px",
//     fontWeight: "600",
//     backgroundColor: status === "Available" ? "#c6f6d5" : "#fed7d7",
//     color: status === "Available" ? "#2f855a" : "#c53030",
//   });

//   return (
//     <>
//       <Header />
//       <div style={{ padding: "24px" }}>
//         <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "#2d3748" }}>
//           Properties
//         </h2>

//         <button
//           onClick={handleAddProperty}
//           style={{
//             marginBottom: "15px",
//             padding: "8px 16px",
//             background: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Add Property
//         </button>

//         <div style={{ overflowX: "auto" }}>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               backgroundColor: "#fff",
//               borderRadius: "8px",
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
//               overflow: "hidden",
//             }}
//           >
//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "#f7fafc",
//                   textAlign: "left",
//                   fontSize: "14px",
//                   textTransform: "uppercase",
//                   color: "#718096",
//                 }}
//               >
//                 <th style={{ padding: "12px 16px" }}>Name</th>
//                 <th style={{ padding: "12px 16px" }}>Location</th>
//                 <th style={{ padding: "12px 16px" }}>Price</th>
//                 <th style={{ padding: "12px 16px" }}>Status</th>
//                 <th style={{ padding: "12px 16px" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {properties.map((property) => (
//                 <tr
//                   key={property.id}
//                   style={{
//                     borderBottom: "1px solid #e2e8f0",
//                     transition: "background 0.2s ease",
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.background = "#f9fafb")}
//                   onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
//                 >
//                   {editingId === property.id ? (
//                     <>
//                       <td style={{ padding: "12px 16px" }}>
//                         <input
//                           name="name"
//                           value={editForm.name}
//                           onChange={handleChange}
//                           style={{ width: "100%" }}
//                         />
//                       </td>
//                       <td style={{ padding: "12px 16px" }}>
//                         <input
//                           name="location"
//                           value={editForm.location}
//                           onChange={handleChange}
//                           style={{ width: "100%" }}
//                         />
//                       </td>
//                       <td style={{ padding: "12px 16px" }}>
//                         <input
//                           name="price"
//                           value={editForm.price}
//                           onChange={handleChange}
//                           style={{ width: "100%" }}
//                         />
//                       </td>
//                       <td style={{ padding: "12px 16px" }}>
//                         <select
//                           name="status"
//                           value={editForm.status}
//                           onChange={handleChange}
//                           style={{ width: "100%", padding: "4px" }}
//                         >
//                           <option value="Available">Available</option>
//                           <option value="Sold">Sold</option>
//                         </select>
//                       </td>
//                       <td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
//                         <button
//                           onClick={handleSave}
//                           style={{
//                             backgroundColor: "#4299e1",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             padding: "6px 12px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={handleCancel}
//                           style={{
//                             backgroundColor: "#f56565",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             padding: "6px 12px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Cancel
//                         </button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td style={{ padding: "12px 16px", fontWeight: "500", color: "#4a5568" }}>
//                         {property.name}
//                       </td>
//                       <td style={{ padding: "12px 16px", color: "#4a5568" }}>{property.location}</td>
//                       <td style={{ padding: "12px 16px", color: "#4a5568" }}>{property.price}</td>
//                       <td style={{ padding: "12px 16px" }}>
//                         <span style={statusBadgeStyle(property.status)}>{property.status}</span>
//                       </td>
//                       <td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
//                         <button
//                           onClick={() => handleEdit(property)}
//                           style={{
//                             backgroundColor: "#4299e1",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             padding: "6px 12px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(property.id)}
//                           style={{
//                             backgroundColor: "#f56565",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             padding: "6px 12px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }
import Header from "../../components/Header";
import React, { useState, useMemo } from "react";
import AddPropertyModal from "../../components/AddPropertyModal";

const initialProperties = [
  {
    id: 1,
    name: "Modern Apartment",
    location: "New York",
    price: "$1,200,000",
    status: "Available",
    type: "Apartment",
    availableFrom: "2025-06-15"
  },
  {
    id: 2,
    name: "Beach House",
    location: "LA",
    price: "$2,000,000",
    status: "Sold",
    type: "Villa",
    availableFrom: "2025-07-01"
  },
];

export default function Properties() {  const [properties, setProperties] = useState(initialProperties);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    price: "",
    status: "Available",
    type: "Apartment",
    availableFrom: ""
  });
  const propertiesPerPage = 10;

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(property => 
        property.name.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(property => property.type === filterType);
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(property => property.status === filterStatus);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [properties, searchTerm, sortConfig, filterType, filterStatus]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProperties.length / propertiesPerPage);
  const currentProperties = filteredAndSortedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  const handleEdit = (property) => {
    setEditingId(property.id);
    setEditForm({ ...property });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = properties.map((item) =>
      item.id === editingId ? { ...editForm, id: editingId } : item
    );
    setProperties(updated);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setProperties(properties.filter((item) => item.id !== id));
  };

  const handleAddProperty = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNewProperty = (newProperty) => {
    setProperties([...properties, { 
      ...newProperty, 
      id: Date.now() 
    }]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="p-6 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Properties</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total: {properties.length} | Available: {properties.filter(p => p.status === "Available").length}
            </p>
          </div>
          <button
            onClick={handleAddProperty}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition-colors"
          >
            Add Property
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Commercial">Commercial</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Under Contract">Under Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {properties.filter(p => p.status === "Available").length}
              </span> Available Properties
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {properties.filter(p => p.status === "Sold").length}
              </span> Sold Properties
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {properties.filter(p => p.type === "Apartment").length}
              </span> Apartments
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {properties.filter(p => p.type === "Villa").length}
              </span> Villas
            </div>
          </div>
        </div>

        {isModalOpen && (
          <AddPropertyModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAdd={handleAddNewProperty}
          />
        )}

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {/*
                { key: 'name', label: 'Name' },
                { key: 'type', label: 'Type' },
                { key: 'location', label: 'Location' },
                { key: 'price', label: 'Price' },
                { key: 'availableFrom', label: 'Available From' },
                { key: 'status', label: 'Status' }
                */}
                <th
                  onClick={() => handleSort('name')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-1">
                    Name
                    {sortConfig.key === 'name' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('type')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-1">
                    Type
                    {sortConfig.key === 'type' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('location')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-1">
                    Location
                    {sortConfig.key === 'location' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-1">
                    Price
                    {sortConfig.key === 'price' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('availableFrom')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-1">
                    Available From
                    {sortConfig.key === 'availableFrom' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortConfig.key === 'status' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {currentProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {editingId === property.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleChange}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="type"
                          value={editForm.type}
                          onChange={handleChange}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa</option>
                          <option value="House">House</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          name="location"
                          value={editForm.location}
                          onChange={handleChange}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          name="price"
                          value={editForm.price}
                          onChange={handleChange}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          name="availableFrom"
                          value={editForm.availableFrom}
                          onChange={handleChange}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleChange}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="Available">Available</option>
                          <option value="Sold">Sold</option>
                          <option value="Under Contract">Under Contract</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {property.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                        {property.type}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                        {property.location}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                        {property.price}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                        {property.availableFrom}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.status === "Available"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : property.status === "Under Contract"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}