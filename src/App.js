import AddItems from "./AddItems";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import SearchItem from "./SearchItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("Todo_List")) || []);
  
    const [newItem, setNewItem] = useState('');

    const addItem = (item) => {
      const id = items.length ? items[items.length - 1].id +1 : 1;
      const addNewItem = {id, checked:false, item}
      const listItems = [...items, addNewItem]
      setItems(listItems)
      localStorage.setItem("Todo_List", JSON.stringify(listItems))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!newItem)
        return;
      console.log(newItem);
      // Add item in the list
      addItem(newItem)
      // Empty the field
      setNewItem('')
      
    }

    const [search, setSearch] = useState('');

    const handleCheck = (id) => {
      const listItems = items.map((item)=> item.id === id ? {...item, checked:!item.checked} : item)
      setItems(listItems)
      localStorage.setItem("Todo_list", JSON.stringify(listItems))
    }
    const handleDelete = (id) => {
      const listItems = items.filter((item) => 
      item.id !== id)
      setItems(listItems)
      localStorage.setItem("Todo_list", JSON.stringify(listItems))
    }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<>
      <Header title = "To do App" 
      />
      <AddItems 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem 
      search={search}
      setSearch={setSearch}
      />
      <Content 
      items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
      <Footer 
      length={items.length}
      /> 
      </>}
      />      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
