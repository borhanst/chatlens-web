import React from 'react';
import { User, Mail, Calendar, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../utils/auth';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.USER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.GUEST:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    logout();
    // In a real app, you might want to redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-gray-900">Profile</h2>
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 text-sm font-inter font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      <div className="space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-full flex items-center justify-center">
            <span className="text-white font-poppins font-bold text-xl">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-poppins font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600 font-inter">@{user.username}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
              <Shield className="w-3 h-3 mr-1" />
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-inter font-medium text-gray-700">Email</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-inter font-medium text-gray-700">Username</p>
              <p className="text-sm text-gray-600">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-inter font-medium text-gray-700">Member since</p>
              <p className="text-sm text-gray-600">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {user.lastLogin && (
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-inter font-medium text-gray-700">Last login</p>
                <p className="text-sm text-gray-600">
                  {new Date(user.lastLogin).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Account Status */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-inter font-medium text-gray-700">Account Status</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;