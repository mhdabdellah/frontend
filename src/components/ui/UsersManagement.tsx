'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, fetchUsers } from "@/lib/services/userService";
import { FaTrash } from "react-icons/fa";
import { AiOutlineClear, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { UserModel } from "@/models/userModel";
import Pagination from "@/components/data-display/Pagination";
import Table from "@/components/data-display/Table";
import TableSearch from "@/components/data-display/TableSearch";
import { IconButton } from "@/components/ui/IconButton";
import { ChangePasswordModal } from "@/components/ui/ChangePasswordModal";
import { ChangeUsernameModal } from "@/components/ui/ChangeUsernameModal";
import { CreateUserModal } from "./CreateUserModal";
import { FiFilter, FiPlus } from "react-icons/fi";

const UsersManagement = () => {
  const [data, setData] = useState<UserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [title, setTitle] = useState<string>("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hiddenFilter, setHiddenFilter] = useState(true);
  const [roleFilter, setRoleFilter] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers(
        page,
        search,
        {
          role: roleFilter,
        },
        localStorage.getItem("authToken")
      );
      setData(response.data);
      data.map((e) => {
        console.log("name: "+ e.username)
      })
      setCount(response.count);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("fetchError");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [page, search, roleFilter]);

  const columns = [
    { header: "username", accessor: "username" },
    { header: "role", accessor: "role" },
    { header: "name", accessor: "name" },
    { header: "email", accessor: "email" },
    { header: "actions", accessor: "actions" },
  ];
  

  const renderRow = (item: UserModel) => (
    <tr key={item.username} className="border-b border-gray-200 hover:bg-gray-50">
      <td>{item.username}</td>
      <td>{item.role}</td>
      <td>{item.profile.firstName} {item.profile.lastName}</td>
      <td>{item.profile.email}</td>
      <td>
        <div className="flex gap-2">
          <IconButton
            icon={AiOutlineLock}
            onClick={() => handleChangePassword(item)} 
            tooltip={"changePassword"}
            color="text-blue-600"
          />
          <IconButton
            icon={AiOutlineUser}
            onClick={() => handleChangeUsername(item)}
            tooltip={"changeUsername"}
            color="text-purple-600"
          />
          <IconButton
            icon={FaTrash}
            onClick={() => handleDelete(item)}
            tooltip={"delete"}
            color="text-red-600"
          />
        </div>
      </td>
    </tr>
  );

  const handleChangePassword = (user: UserModel) => {
    setSelectedUser(user);
    setTitle("changePassword");
    setShowChangePasswordModal(true);
  };

  const handleChangeUsername = (user: UserModel) => {
    setSelectedUser(user);
    setTitle("changeUsername");
    setShowChangeUsernameModal(true);
  };

  const handleDelete = async (user: UserModel) => {
    if (confirm("deleteConfirm")) {
      try {
        await deleteUser(localStorage.getItem("authToken"), user.username);
        toast.success("deleteSuccess");
        fetchUsersData();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("deleteError");
      }
    }
  };

  const clearFilters = () => {
    setRoleFilter("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm m-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Users</h1>
        <div className="flex items-center gap-4">
          <TableSearch value={search} onChange={setSearch} />
          <IconButton
            icon={FiFilter}
            onClick={() => setHiddenFilter(!hiddenFilter)}
            tooltip="Filter"
            color="text-black" // Makes the icon black
            size={22}
          />

          <IconButton
            icon={FiPlus}
            onClick={() => {
              setTitle("createUser");
              setSelectedUser(null);
              setOpenModal(true);
            }}
            tooltip="Create"
            color="text-black"
            size={22}
          />
        </div>
      </div>

      {/* Filters */}
      {!hiddenFilter && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">{"role"}</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">{"all"}</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex items-end justify-end">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <AiOutlineClear />
              {"clearFilters"}
            </button>
          </div>
        </div>
      )}

      <Table columns={columns} renderRow={renderRow} data={data} />
      
      <Pagination page={page} count={count} onPageChange={setPage} />
      
      {loading && <div className="text-center p-4">{"loading"}</div>}

      {openModal && (
        <CreateUserModal title={title} onClose={() => setOpenModal(false)} refreshUsers={fetchUsersData} />
      )}

      {showChangePasswordModal && selectedUser && (
        <ChangePasswordModal 
          username={selectedUser.username}
          onClose={() => setShowChangePasswordModal(false)} 
          onSuccess={fetchUsersData}
        />
      )}

      {showChangeUsernameModal && selectedUser && (
        <ChangeUsernameModal 
          username={selectedUser.username}
          onClose={() => setShowChangeUsernameModal(false)} 
          onSuccess={fetchUsersData}
        />
      )}
    </div>
  );
};

export default UsersManagement;