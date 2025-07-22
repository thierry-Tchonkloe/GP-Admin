import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MobileNavigation from '../../components/ui/MobileNavigation';
import TabNavigation from './components/TabNavigation';
import PersonalInfoTab from './components/PersonalInfoTab';
import EmploymentDetailsTab from './components/EmploymentDetailsTab';
import BiometricSetupTab from './components/BiometricSetupTab';
import FormActions from './components/FormActions';
import axios from 'axios';

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [completedTabs, setCompletedTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    gender: '',
    maritalStatus: '',
    //profilePhoto: null,
    // emergencyContactName: '',
    // emergencyContactPhone: '',
    // emergencyContactRelation: '',
    
    // Employment Details
    employeeCode: '',
    position: '',
    department: '',
    hireDate: '',
    contractType: '',
    salary: '',
    //manager: '',
    contractEndDate: '',
    workStartTime: '08:00',
    workEndTime: '17:00',
    educationLevel: '',
    experience: '',
    //skills: '',
    //manualCodeEntry: false,
    
    // Biometric Setup
    skipBiometric: false,
    fingerprintsEnrolled: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Generate employee code on component mount
    if (!formData.employeeCode && !formData.manualCodeEntry) {
      generateEmployeeCode();
    }
  }, [formData.department]);

  const generateEmployeeCode = () => {
    const prefix = formData.department ? formData.department.substring(0, 3).toUpperCase() : 'EMP';
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const code = `${prefix}${timestamp}${randomNum}`;
    setFormData(prev => ({ ...prev, employeeCode: code }));
  };

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }
    
    return newErrors;
  };

  const validateEmploymentDetails = () => {
    const newErrors = {};
    
    if (!formData.position?.trim()) {
      newErrors.position = 'Le poste est requis';
    }
    
    if (!formData.department?.trim()) {
      newErrors.department = 'Le département est requis';
    }
    
    if (!formData.hireDate) {
      newErrors.hireDate = 'La date d\'embauche est requise';
    }
    
    if (!formData.contractType?.trim()) {
      newErrors.contractType = 'Le type de contrat est requis';
    }
    
    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Le salaire est requis et doit être positif';
    }
    
    if (!formData.employeeCode?.trim()) {
      newErrors.employeeCode = 'Le code employé est requis';
    }
    
    return newErrors;
  };

  const validateCurrentTab = () => {
    let newErrors = {};
    
    switch (activeTab) {
      case 'personal':
        newErrors = validatePersonalInfo();
        break;
      case 'employment':
        newErrors = validateEmploymentDetails();
        break;
      case 'biometric':
        // Biometric validation is optional
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (tabId) => {
    // Validate current tab before switching
    if (validateCurrentTab()) {
      // Mark current tab as completed
      if (!completedTabs.includes(activeTab)) {
        setCompletedTabs(prev => [...prev, activeTab]);
      }
    }
    
    setActiveTab(tabId);
  };

  const handleSave = async () => {
    // Validate all tabs
    const personalErrors = validatePersonalInfo();
    const employmentErrors = validateEmploymentDetails();
    const allErrors = { ...personalErrors, ...employmentErrors };
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Switch to first tab with errors
      if (Object.keys(personalErrors).length > 0) {
        setActiveTab('personal');
      } else if (Object.keys(employmentErrors).length > 0) {
        setActiveTab('employment');
      }
      return;
    }
    
    setIsLoading(true);
    
    // try {
    //   // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 2000));
      
    //   console.log('Employee data saved:', formData);
      
    //   // Mark all tabs as completed
    //   setCompletedTabs(['personal', 'employment', 'biometric']);
    //   setShowSuccess(true);
      
    // } catch (error) {
    //   console.error('Error saving employee:', error);
    // } finally {
    //   setIsLoading(false);
    // }
   const data ={
    full_name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    date_of_birth: formData.dateOfBirth,
    address: formData.address,
    gender: formData.gender,
    marital_status: formData.maritalStatus,
    //emergency_contact_name: formData.emergencyContactName,
    // emergency_contact_phone: formData.emergencyContactPhone,
    // emergency_contact_relation: formData.emergencyContactRelation,
    
    employee_code: formData.employeeCode,
    position: formData.position,
    department: formData.department,
    hire_date: formData.hireDate,
    contract_type: formData.contractType,
    salary: parseFloat(formData.salary),
    //manager: formData.manager,
    contract_end_date: formData.contractEndDate || null,
    work_start_time: formData.workStartTime,
    work_end_time: formData.workEndTime,
    education_level: formData.educationLevel,
    experience: formData.experience,
    //skills: formData.skills,

    skip_biometric: formData.skipBiometric,
    fingerprints_enrolled: formData.fingerprintsEnrolled,
  }

  console.log(data)

    try {
      const response = await axios.post('http://127.0.0.1:8000/employes/', data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*"
        },
      } );

    
    
      console.log('Employé créé avec succès :', response.data);
      
      setCompletedTabs(['personal', 'employment', 'biometric']);
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Erreur lors de la création de l’employé :', error);
      alert("Échec de l'enregistrement de l'employé. Vérifie les champs ou réessaie plus tard.");
    } finally {
      setIsLoading(false);
      setShowSuccess({
        name: `${response.data.fullName}`,
        employeeId: response.data.code_unique  // ou `data.code_unique` selon ta réponse API
      });
    }
    
  };

  const handleSaveAsDraft = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call for draft save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Employee draft saved:', formData);
      
      // Show success message or redirect
      navigate('/employee-management');
      
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/employee-management');
  };

  const handleAddAnother = () => {
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      gender: '',
      maritalStatus: '',
      profilePhoto: null,
      //emergencyContactName: '',
      //emergencyContactPhone: '',
      //emergencyContactRelation: '',
      employeeCode: '',
      position: '',
      department: '',
      hireDate: '',
      contractType: '',
      salary: '',
      //manager: '',
      contractEndDate: '',
      workStartTime: '08:00',
      workEndTime: '17:00',
      educationLevel: '',
      experience: '',
      //skills: '',
      manualCodeEntry: false,
      skipBiometric: false,
      fingerprintsEnrolled: []
    });
    setActiveTab('personal');
    setCompletedTabs([]);
    setShowSuccess(false);
    setErrors({});
  };

  const handleViewEmployee = () => {
    navigate('/employee-management');
  };

  const isFormValid = () => {
    const personalErrors = validatePersonalInfo();
    const employmentErrors = validateEmploymentDetails();
    return Object.keys(personalErrors).length === 0 && Object.keys(employmentErrors).length === 0;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            formData={formData}
            onFormDataChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 'employment':
        return (
          <EmploymentDetailsTab
            formData={formData}
            onFormDataChange={handleFormDataChange}
            errors={errors}
          />
        );
      // case 'biometric':
      //   return (
      //     <BiometricSetupTab
      //       formData={formData}
      //       onFormDataChange={handleFormDataChange}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isSidebarOpen={sidebarOpen}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className="lg:pl-60 pt-16 pb-24">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <Breadcrumb />
          
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            completedTabs={completedTabs}
          />
          
          <div className="mt-8">
            <div className="bg-surface rounded-lg shadow-elevation-2 p-6 lg:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      
      <FormActions
        onSave={handleSave}
        onSaveAsDraft={handleSaveAsDraft}
        onCancel={handleCancel}
        isLoading={isLoading}
        isValid={isFormValid()}
        showSuccess={showSuccess}
        onAddAnother={handleAddAnother}
        onViewEmployee={handleViewEmployee}
      />
      
      <MobileNavigation />
    </div>
  );
};

export default EmployeeRegistration;