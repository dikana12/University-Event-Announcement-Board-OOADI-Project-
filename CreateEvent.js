import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './styles/CreateEvent.css';

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [removedFiles, setRemovedFiles] = useState([]);

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: 'academic',
    department: '',
    audience: 'students',
    location: '',
   