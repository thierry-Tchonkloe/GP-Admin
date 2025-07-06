import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const pathMap = {
      '/dashboard': 'Tableau de Bord',
      '/employee-management': 'Gestion des Employés',
      '/employee-registration': 'Inscription Employé',
      '/attendance-tracking': 'Suivi de Présence',
      '/reports-analytics': 'Rapports & Analyses',
      '/system-settings': 'Paramètres Système',
      '/company-registration': 'Inscription Entreprise',
      '/login': 'Connexion'
    };
    return pathMap[location.pathname] || 'GP-Admin';
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    localStorage.clear();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/system-settings"); // adapte selon ta route réelle
    setUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Mobile Menu Toggle & Title */}
        <div className="flex items-center space-x-4">
          {/* Mobile/Tablet Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          />
          
          {/* Page Title */}
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-text-primary font-heading">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            iconName="Bell"
            iconSize={20}
          >
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-error rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>


              <span className="hidden sm:block text-sm font-medium text-text-primary">
                  {user?.name || userProfile?.fullName || user?.email || "Admin"}
              </span>


              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-200" 
                  onClick={() => setUserMenuOpen(false)}
                />
                
                {/* Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-3 z-300">
                  <div className="py-2">
                    <button
                      onClick={handleProfile}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors duration-200"
                    >
                      <Icon name="User" size={16} className="mr-3" />
                      Profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;