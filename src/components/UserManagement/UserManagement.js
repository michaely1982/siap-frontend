import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Shield, UserCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getAllUsers, updateUser, deleteUser, verifyUser, unverifyUser } from '../../services/api';
import UserModal from '../Modal/UserModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (formData) => {
    try {
      if (editingUser) {
        const updatedUser = await updateUser(editingUser._id, formData);
        setUsers(users.map(u => u._id === editingUser._id ? updatedUser : u));
        alert('User updated successfully');
      }
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      alert(error.response?.data?.message || 'Failed to save user');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleVerifyUser = async (id) => {
    if (window.confirm('Verify this user? They will be able to access the system.')) {
      try {
        const result = await verifyUser(id);
        setUsers(users.map(u => u._id === id ? result.user : u));
        alert('User verified successfully');
      } catch (error) {
        console.error('Error verifying user:', error);
        alert(error.response?.data?.message || 'Failed to verify user');
      }
    }
  };

  const handleUnverifyUser = async (id) => {
    if (window.confirm('Revoke verification? User will lose access to the system.')) {
      try {
        const result = await unverifyUser(id);
        setUsers(users.map(u => u._id === id ? result.user : u));
        alert('User verification revoked');
      } catch (error) {
        console.error('Error unverifying user:', error);
        alert(error.response?.data?.message || 'Failed to unverify user');
      }
    }
  };

  const verifiedUsers = users.filter(u => u.isVerified);
  const pendingUsers = users.filter(u => !u.isVerified);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            User Management
          </h2>
          <p className="text-gray-600 mt-1">Manage all system users (Admin only)</p>
        </div>
      </div>

      {/* Pending Verification Section */}
      {pendingUsers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-yellow-600" />
            Pending Verification ({pendingUsers.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NIP</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Registered</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-200">
                {pendingUsers.map(user => (
                  <tr key={user._id} className="hover:bg-yellow-100 transition">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-yellow-700" />
                        </div>
                        <span className="font-medium text-gray-800">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.nip}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleVerifyUser(user._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                          title="Verify User"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Verify
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Verified Users Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Verified Users ({verifiedUsers.length})
          </h3>
        </div>

        {verifiedUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No verified users yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NIP</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Verified</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {verifiedUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.nip}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.role === 'admin' && <Shield className="w-3 h-3" />}
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.verifiedAt ? new Date(user.verifiedAt).toLocaleDateString() : '-'}
                      {user.verifiedBy && (
                        <div className="text-xs text-gray-500">by {user.verifiedBy.fullName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit User"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleUnverifyUser(user._id)}
                          className="text-orange-600 hover:text-orange-800 p-1"
                          title="Revoke Verification"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        editData={editingUser}
      />
    </div>
  );
};

export default UserManagement;
