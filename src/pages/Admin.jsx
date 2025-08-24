import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import StitchingMarks from '../components/StitchingMarks';

const AdminContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.tertiary} 50%, ${({ theme }) => theme.colors.quaternary} 100%);
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
`;

const AdminPanel = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.dark};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  padding: 1rem;
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ItemCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const CategoryTag = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const SizeOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  
  // New item form state
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    hasSizes: false,
    regularPrice: '',
    largePrice: '',
    singlePrice: '',
    image: null
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    try {
      // First check if we have updated data in localStorage
      const savedMenuData = localStorage.getItem('kurtosMenuData');
      const savedCategories = localStorage.getItem('kurtosCategories');
      
      if (savedMenuData && savedCategories) {
        // Use the saved data from localStorage (most recent)
        const parsedMenuData = JSON.parse(savedMenuData);
        const parsedCategories = JSON.parse(savedCategories);
        
        setMenuItems(parsedMenuData);
        setCategories(parsedCategories);
        
        console.log('Loaded data from localStorage (most recent changes)');
        return;
      }
      
      // If no localStorage data, load from CSV file
      try {
        const response = await fetch('/Menu_Data.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV');
        }
        const csvText = await response.text();
        const result = Papa.parse(csvText, { header: true });
        const data = result.data.filter(row => Object.values(row).some(value => value !== null && value !== ''));
        
        setMenuItems(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.Category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        console.log('Loaded data from CSV file');
      } catch (error) {
        console.error('Error loading CSV:', error);
        // If CSV loading fails, try to load from localStorage as fallback
        const savedMenuData = localStorage.getItem('kurtosMenuData');
        if (savedMenuData) {
          const parsedMenuData = JSON.parse(savedMenuData);
          setMenuItems(parsedMenuData);
          const uniqueCategories = [...new Set(parsedMenuData.map(item => item.Category).filter(Boolean))];
          setCategories(uniqueCategories);
          console.log('Loaded data from localStorage as fallback');
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded authentication (in production, use proper hashing)
    if (username === 'kurtos' && password === 'kurtos@021') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setNewCategory('');
      
      // Save updated categories to CSV
      await saveToCSV();
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    if (window.confirm(`Delete category "${categoryToDelete}"? This will also delete all items in this category.`)) {
      const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
      const updatedMenuItems = menuItems.filter(item => item.Category !== categoryToDelete);
      
      setCategories(updatedCategories);
      setMenuItems(updatedMenuItems);
      
      // Save updated data to CSV
      await saveToCSV();
    }
  };

  const handleEditCategory = async (oldCategory, newCategoryName) => {
    if (newCategoryName.trim() && newCategoryName !== oldCategory) {
      const updatedCategories = categories.map(cat => cat === oldCategory ? newCategoryName : cat);
      const updatedMenuItems = menuItems.map(item => 
        item.Category === oldCategory 
          ? { ...item, Category: newCategoryName }
          : item
      );
      
      setCategories(updatedCategories);
      setMenuItems(updatedMenuItems);
      setEditingCategory(null);
      
      // Save updated data to CSV
      await saveToCSV();
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewItem({ ...newItem, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.category) {
      alert('Please fill in name and category');
      return;
    }

    if (!newItem.image) {
      alert('Please upload an image for the item');
      return;
    }

    const item = {
      Item: newItem.name,
      Category: newItem.category,
      ...(newItem.hasSizes 
        ? {
            'Regular Price': newItem.regularPrice,
            'Large Price': newItem.largePrice
          }
        : {
            Price: newItem.singlePrice
          }
      ),
      img: newItem.image
    };

    const updatedMenuItems = [...menuItems, item];
    setMenuItems(updatedMenuItems);
    
    // Save updated data to CSV
    await saveToCSV();
    
    setNewItem({
      name: '',
      category: '',
      hasSizes: false,
      regularPrice: '',
      largePrice: '',
      singlePrice: '',
      image: null
    });
    
    alert('Item added successfully!');
  };

  const handleEditItem = (item) => {
    setEditingItem({
      ...item,
      name: item.Item,
      category: item.Category,
      hasSizes: !!(item['Regular Price'] || item['Large Price']),
      regularPrice: item['Regular Price'] || '',
      largePrice: item['Large Price'] || '',
      singlePrice: item.Price || '',
      image: item.img || null
    });
    setIsEditingItem(true);
  };

  const handleUpdateItem = async () => {
    if (!editingItem.name || !editingItem.category) {
      alert('Please fill in name and category');
      return;
    }

    const updatedItem = {
      Item: editingItem.name,
      Category: editingItem.category,
      ...(editingItem.hasSizes 
        ? {
            'Regular Price': editingItem.regularPrice,
            'Large Price': editingItem.largePrice
          }
        : {
            Price: editingItem.singlePrice
          }
      ),
      img: editingItem.image || '/default-item.jpg'
    };

    const updatedMenuItems = menuItems.map(item => 
      item.Item === editingItem.Item ? updatedItem : item
    );
    
    setMenuItems(updatedMenuItems);
    setEditingItem(null);
    setIsEditingItem(false);
    
    // Save updated data to CSV
    await saveToCSV();
    
    alert('Item updated successfully!');
  };

  const handleDeleteItem = async (itemIndex) => {
    if (window.confirm('Delete this item?')) {
      const updatedMenuItems = menuItems.filter((_, index) => index !== itemIndex);
      setMenuItems(updatedMenuItems);
      
      // Save updated data to CSV
      await saveToCSV();
    }
  };

  const saveToCSV = async () => {
    try {
      // Create CSV content with proper headers matching your CSV structure
      const csvData = menuItems.map(item => ({
        Category: item.Category || '',
        Item: item.Item || '',
        'Regular Price': item['Regular Price'] || '',
        'Large Price': item['Large Price'] || '',
        Price: item.Price || '',
        'With Cone': item['With Cone'] || '',
        '': '', // Empty column for 7th position
        img: item.img || ''
      }));
      
      const csv = Papa.unparse(csvData);
      
      // Download the updated CSV
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Menu_Data_Updated.csv';
      a.click();
      
      // Store the updated data in localStorage as backup
      localStorage.setItem('kurtosMenuData', JSON.stringify(menuItems));
      localStorage.setItem('kurtosCategories', JSON.stringify(categories));
      
      alert('CSV file downloaded successfully! Please replace the existing Menu_Data.csv file with this updated version.');
    } catch (error) {
      console.error('Error saving CSV:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const exportCSV = () => {
    // Create CSV content with proper headers matching your CSV structure
    const csvData = menuItems.map(item => ({
      Category: item.Category || '',
      Item: item.Item || '',
      'Regular Price': item['Regular Price'] || '',
      'Large Price': item['Large Price'] || '',
      Price: item.Price || '',
      'With Cone': item['With Cone'] || '',
      '': '', // Empty column for 7th position
      img: item.img || ''
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Menu_Data.csv';
    a.click();
  };

  const clearLocalStorage = () => {
    if (window.confirm('This will clear all locally saved changes. Are you sure?')) {
      localStorage.removeItem('kurtosMenuData');
      localStorage.removeItem('kurtosCategories');
      loadData(); // Reload from CSV
      alert('Local changes cleared. Data reloaded from CSV file.');
    }
  };

  if (!isLoggedIn) {
    return (
      <AdminContainer>
        <LoginForm onSubmit={handleLogin}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </LoginForm>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminPanel>
        <Header>
          <h1>Kurtos Admin Panel</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {localStorage.getItem('kurtosMenuData') && (
              <span style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '20px', 
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                💾 Local Changes Saved
              </span>
            )}
            <Button onClick={loadData} style={{ backgroundColor: '#17a2b8' }}>Refresh Data</Button>
            <Button onClick={() => setIsLoggedIn(false)}>Logout</Button>
          </div>
        </Header>
        <StitchingMarks />

        <TabContainer>
          <Tab 
            active={activeTab === 'categories'} 
            onClick={() => setActiveTab('categories')}
          >
            Manage Categories
          </Tab>
          <Tab 
            active={activeTab === 'items'} 
            onClick={() => setActiveTab('items')}
          >
            Manage Menu Items
          </Tab>
          <Tab 
            active={activeTab === 'export'} 
            onClick={() => setActiveTab('export')}
          >
            Export Data
          </Tab>
        </TabContainer>

        {activeTab === 'categories' && (
          <FormContainer>
            <h3>Category Management</h3>
            <FormRow columns="1fr auto">
              <Input
                type="text"
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button onClick={handleAddCategory}>Add Category</Button>
            </FormRow>
            
                         <div style={{ marginTop: '2rem' }}>
               <h4>Existing Categories:</h4>
               {categories.map((category, index) => (
                 <div key={index} style={{ 
                   display: 'flex', 
                   justifyContent: 'space-between', 
                   alignItems: 'center',
                   padding: '1rem',
                   background: '#f9f9f9',
                   margin: '0.5rem 0',
                   borderRadius: '10px'
                 }}>
                   {editingCategory === category ? (
                     <Input
                       type="text"
                       defaultValue={category}
                       onBlur={(e) => handleEditCategory(category, e.target.value)}
                       onKeyPress={(e) => {
                         if (e.key === 'Enter') {
                           handleEditCategory(category, e.target.value);
                         }
                       }}
                       autoFocus
                     />
                   ) : (
                     <span onClick={() => setEditingCategory(category)} style={{ cursor: 'pointer' }}>
                       {category}
                     </span>
                   )}
                   <Button onClick={() => handleDeleteCategory(category)} style={{ backgroundColor: '#dc3545' }}>Delete</Button>
                 </div>
               ))}
               <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                 <Button onClick={saveToCSV} style={{ backgroundColor: '#17a2b8' }}>Save All Changes to CSV</Button>
               </div>
             </div>
          </FormContainer>
        )}

        {activeTab === 'items' && (
          <>
            {isEditingItem ? (
              <FormContainer>
                <h3>Edit Menu Item</h3>
                <FormRow columns="1fr 1fr">
                  <Input
                    type="text"
                    placeholder="Item name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                  <Select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </FormRow>

                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={editingItem.hasSizes}
                    onChange={(e) => setEditingItem({ ...editingItem, hasSizes: e.target.checked })}
                  />
                  Has different sizes?
                </CheckboxLabel>

                {editingItem.hasSizes ? (
                  <FormRow columns="1fr 1fr">
                    <Input
                      type="number"
                      placeholder="Regular price"
                      value={editingItem.regularPrice}
                      onChange={(e) => setEditingItem({ ...editingItem, regularPrice: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Large price"
                      value={editingItem.largePrice}
                      onChange={(e) => setEditingItem({ ...editingItem, largePrice: e.target.value })}
                    />
                  </FormRow>
                ) : (
                  <Input
                    type="number"
                    placeholder="Price"
                    value={editingItem.singlePrice}
                    onChange={(e) => setEditingItem({ ...editingItem, singlePrice: e.target.value })}
                  />
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Image Upload:</strong>
                  <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0' }}>
                    Upload a new image or keep the existing one. Images are saved as base64 strings in the <code>img</code> column.
                  </p>
                </div>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setEditingItem({ ...editingItem, image: e.target.result });
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />

                {editingItem.image && (
                  <ImagePreview src={editingItem.image} alt="Preview" />
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <Button onClick={handleUpdateItem}>Update Item</Button>
                  <Button onClick={() => {
                    setIsEditingItem(false);
                    setEditingItem(null);
                  }} style={{ backgroundColor: '#666' }}>Cancel</Button>
                </div>
              </FormContainer>
            ) : (
              <FormContainer>
                <h3>Add New Menu Item</h3>
                <FormRow columns="1fr 1fr">
                  <Input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <Select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </FormRow>

                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={newItem.hasSizes}
                    onChange={(e) => setNewItem({ ...newItem, hasSizes: e.target.checked })}
                  />
                  Has different sizes?
                </CheckboxLabel>

                {newItem.hasSizes ? (
                  <FormRow columns="1fr 1fr">
                    <Input
                      type="number"
                      placeholder="Regular price"
                      value={newItem.regularPrice}
                      onChange={(e) => setNewItem({ ...newItem, regularPrice: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Large price"
                      value={newItem.largePrice}
                      onChange={(e) => setNewItem({ ...newItem, largePrice: e.target.value })}
                    />
                  </FormRow>
                ) : (
                  <Input
                    type="number"
                    placeholder="Price"
                    value={newItem.singlePrice}
                    onChange={(e) => setNewItem({ ...newItem, singlePrice: e.target.value })}
                  />
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Image Upload (Required):</strong>
                  <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0' }}>
                    Upload an image for the menu item. The image will be saved as a base64 string in the <code>img</code> column of the CSV.
                  </p>
                </div>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />

                {newItem.image && (
                  <ImagePreview src={newItem.image} alt="Preview" />
                )}

                <Button onClick={handleAddItem}>Add Item</Button>
              </FormContainer>
            )}

            <ItemGrid>
              {menuItems.map((item, index) => (
                                 <ItemCard key={index}>
                   {item.img && <ImagePreview src={item.img} alt={item.Item} />}
                   <h4>{item.Item}</h4>
                  <CategoryTag>{item.Category}</CategoryTag>
                  <div style={{ margin: '1rem 0' }}>
                    {item['Regular Price'] ? (
                      <>
                        <div>Regular: Rs. {item['Regular Price']}</div>
                        <div>Large: Rs. {item['Large Price']}</div>
                      </>
                    ) : (
                      <div>Price: Rs. {item.Price}</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <Button onClick={() => handleEditItem(item)} style={{ backgroundColor: '#28a745' }}>Edit</Button>
                    <Button onClick={() => handleDeleteItem(index)} style={{ backgroundColor: '#dc3545' }}>Delete</Button>
                  </div>
                </ItemCard>
              ))}
            </ItemGrid>
          </>
        )}

        {activeTab === 'export' && (
          <FormContainer>
            <h3>Export Menu Data</h3>
            <p>Download the current menu data as a CSV file.</p>
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <strong>Important:</strong> After making changes, download the updated CSV and replace the existing <code>Menu_Data.csv</code> file in the <code>public</code> folder to see changes on the menu pages.
            </div>
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
              <strong>🚀 Vercel Deployment:</strong> If you're deploying on Vercel, make sure to upload the updated CSV file to the <code>public</code> folder in your Vercel project. The CSV file must be accessible at the root URL.
            </div>
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
              <strong>🎥 Video Files:</strong> Make sure all video files (reel1.mp4 to reel6.mp4) are uploaded to the <code>public</code> folder in your Vercel project for the reels gallery to work properly.
            </div>
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
              <strong>📧 Email System:</strong> The checkout system now automatically sends order emails to your team using Gmail API. Make sure all Gmail environment variables are set in Vercel for this to work.
            </div>
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
              <strong>💾 Local Storage:</strong> Your changes are automatically saved locally. This prevents data loss when refreshing the page.
            </div>
            <Button onClick={exportCSV}>Download Updated CSV</Button>
            <Button onClick={saveToCSV} style={{ backgroundColor: '#17a2b8', marginLeft: '1rem' }}>Save All Changes</Button>
            <Button onClick={clearLocalStorage} style={{ backgroundColor: '#dc3545', marginLeft: '1rem' }}>Clear Local Changes</Button>
          </FormContainer>
        )}
      </AdminPanel>
    </AdminContainer>
  );
};

export default Admin;