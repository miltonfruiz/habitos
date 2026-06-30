import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Habit {
  name: string;
  description: string;
  frequency: string;
  createdAt: Date;
}

interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, frequency }),
      });
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, frequency }),
      });
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetHabits = async () => {
    try {
      const response = await fetch(`${API_URL}/api/habits`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateHabit = async () => {
    try {
      const response = await fetch(`${API_URL}/api/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, frequency }),
      });
      const data = await response.json();
      setHabits([...habits, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetHabitById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/habits/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateHabit = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, frequency }),
      });
      const data = await response.json();
      setHabits(habits.map((habit) => (habit._id === id ? data : habit)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/habits/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHabits(habits.filter((habit) => habit._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        placeholder="Frequency"
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetHabits}>Get Habits</button>
      <button onClick={handleCreateHabit}>Create Habit</button>
      {habits.map((habit) => (
        <div key={habit._id}>
          <p>{habit.name}</p>
          <p>{habit.description}</p>
          <p>{habit.frequency}</p>
          <button onClick={() => handleGetHabitById(habit._id)}>Get Habit</button>
          <button onClick={() => handleUpdateHabit(habit._id)}>Update Habit</button>
          <button onClick={() => handleDeleteHabit(habit._id)}>Delete Habit</button>
        </div>
      ))}
    </div>
  );
};

export default App;