import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs'; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', department: '' });
  const [editingStoryId, setEditingStoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(9); // Show 9 stories per page (3x3)
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order
  const [showAddModal, setShowAddModal] = useState(false); // Modal state for Add/Edit form

  useEffect(() => {
    fetch('http://localhost:8080/api/stories')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStoryId) {
      // Update existing story
      fetch(`http://localhost:8080/api/stories/${editingStoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(updatedStory => {
          setStories(stories.map(story => (story.id === updatedStory.id ? updatedStory : story)));
          setFormData({ title: '', content: '', department: '' });
          setEditingStoryId(null);
          setShowAddModal(false); // Close modal after submission
        })
        .catch(error => console.error('Error updating story:', error));
    } else {
      // Add new story
      fetch('http://localhost:8080/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(newStory => {
          setStories([...stories, newStory]);
          setFormData({ title: '', content: '', department: '' });
          setShowAddModal(false); // Close modal after submission
        })
        .catch(error => console.error('Error adding story:', error));
    }
  };

  const handleEdit = (story) => {
    setFormData({ title: story.title, content: story.content, department: story.department });
    setEditingStoryId(story.id);
    setShowAddModal(true); // Open the modal in edit mode
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/stories/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setStories(stories.filter(story => story.id !== id));
      })
      .catch(error => console.error('Error deleting story:', error));
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter, Sort, and Search Logic
  const filteredStories = stories
    .filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(story => story.department.toLowerCase().includes(departmentFilter.toLowerCase()))
    .sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === 'asc') {
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      } else {
        return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
      }
    });

  // Pagination Calculation
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);

  // Total Pages
  const totalPages = Math.max(1, Math.ceil(filteredStories.length / storiesPerPage));

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Row className="justify-content-center w-100">
        <Col md={8}>
          <h1 className="text-center mb-4">VIA Tabloid Stories</h1>

          {/* Search and Filter */}
          <Form className="mb-4">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Search by Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filter by Department</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Department"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Sort by Title</Form.Label>
                  <Form.Control as="select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {/* Add New Story Button */}
          <Button variant="success" className="mb-4" onClick={() => setShowAddModal(true)}>
            <BsPlus /> Add New Story
          </Button>

          {/* No Stories Available Message */}
          {filteredStories.length === 0 && (
            <div className="text-center mb-4">
              <h5>No stories available. Add a new story to get started!</h5>
            </div>
          )}

          {/* Story List */}
          <ListGroup className="mb-4">
            {currentStories.map(story => (
              <ListGroup.Item key={story.id}>
                <h5>{story.title}</h5>
                <p>{story.content}</p>
                <small className="text-muted">Department: {story.department}</small>
                <div className="d-flex justify-content-end">
                  <Button variant="link" onClick={() => handleEdit(story)}>
                    <BsPencil /> Edit
                  </Button>
                  <Button variant="link" onClick={() => handleDelete(story.id)}>
                    <BsTrash /> Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Updated Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
            <Button
              variant="secondary"
              onClick={() => handlePaginationChange(currentPage - 1)}
              disabled={isFirstPage}
            >
              <i className="fas fa-arrow-left"></i> Previous
            </Button>

            <span>Page {currentPage} of {totalPages}</span>

            <Button
              variant="secondary"
              onClick={() => handlePaginationChange(currentPage + 1)}
              disabled={isLastPage}
            >
              Next <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        </Col>
      </Row>

      {/* Add/Edit Story Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingStoryId ? 'Edit Story' : 'Add Story'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                {editingStoryId ? 'Update Story' : 'Add Story'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
