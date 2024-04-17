import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";
import { Modal, Form, Button, ButtonGroup } from "react-bootstrap";
import { workerNames } from "../constants/names";
import axios from "axios";
import { IoIosRemoveCircle } from "react-icons/io";

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("");

  // const { user } = useAuthContext();

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/admin/complaints", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (response.ok) {
          setComplaints(json);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    const fetchPredictions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/predictions");
        setPredictedValues(response.data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchComplaints();
    fetchPredictions();
  }, []);



  // Function to fetch predicted values from Flask server
async function fetchPredictions() {
  try {
      // Make a POST request to your Flask server
      const response = await axios.post("http://localhost:5000/predict", {
          // Provide input data for prediction if required
          // Example: { "schoolCount": 10, "hospitalCount": 5, "upvotes": 100, "time": 2 }
      });
      // Extract predicted values from the response
      const predictedValues = response.data.prediction;
      return predictedValues;
  } catch (error) {
      console.error("Error fetching predictions:", error);
      return null;
  }
}

// Call the function to fetch predictions when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  const predictedValues = await fetchPredictions();
  if (predictedValues) {
      // Use the predicted values to update your table or perform other actions
      console.log("Predicted Values:", predictedValues);
  } else {
      // Handle error or display a message
      console.error("Failed to fetch predictions");
  }
});

  const handleStatusChange = async (complaintId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/admin/complaints/${complaintId}/status`,
        { status }
      );

      let newComplaints = [
        ...complaints.filter((el) => el._id !== complaintId),
        response.data,
      ];
      setComplaints(Array.from([...newComplaints]));
    } catch (error) {
      // Handle error
      console.error("Error:", error.response.data); // Log error response or do something else
    }
  };

  const showFullDescription = (description) => {
    alert(description);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const AssignModal = ({
    complaintId,
    complaints,
    setComplaints,
    setShowAssignModal,
    showAssignModal,
  }) => {
    const [assignee, setAssignee] = useState("");

    return (
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        className="p-2"
      >
        <Modal.Title className="p-2 mx-2">Assign Worker</Modal.Title>
        <Modal.Body>
          <Form.Select
            value={assignee}
            className="mb-3"
            onChange={(e) => {
              e.preventDefault();
              setAssignee(e.target.value);
            }}
          >
            <option>Assign to</option>
            {workerNames.map((el) => (
              <>
                <option value={el}>{el}</option>
              </>
            ))}
          </Form.Select>
          <Button
            onClick={() => {
              handleAssignUser(
                complaintId,
                complaints,
                setComplaints,
                assignee
              );
              setShowAssignModal(false);
            }}
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  const renderComplaintsByCategory = () => {
    return (
      <>
        <AssignModal
          complaintId={selectedComplaintId}
          complaints={complaints}
          setComplaints={setComplaints}
          showAssignModal={showAssignModal}
          setShowAssignModal={setShowAssignModal}
        />
        {selectedCategory && (
          <tr className="table-active">
            <td colSpan="8">
              <strong>{selectedCategory} Complaints</strong>
            </td>
          </tr>
        )}
        {complaints
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .filter((complaint) => {
            const categoryFilter = complaint.category
              .toLowerCase()
              .includes(selectedCategory.toLowerCase());
            switch (complaintStatusFilter) {
              case "ALL":
                return true;
              case "COMPLETED":
                return complaint.status === "COMPLETED" && categoryFilter;
              case "PENDING":
                return complaint.status === "PENDING" && categoryFilter;
              case "IN PROGRESS":
                return complaint.status === "IN PROGRESS" && categoryFilter;

              default:
                return categoryFilter;
            }
          })
          .map((complaint, index) => (
            <tr key={complaint.id}>
              <td>{index + 1}</td>
              <td>{"C"+(index+1)}</td>
             
              <td>{complaint.user_id.email}</td>
              <td>{String(complaint.phoneNumber)}</td>
              <td>{complaint.priority[index]}</td>
              <td>{complaint.category}</td>
              <td>{complaint.sub_category}</td>

              <td>
                <div className="d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                    {complaint.description.length > 50 ? (
                      <>
                        {complaint.description.substring(0, 50)}...
                        <button
                          className="btn btn-link"
                          onClick={() =>
                            showFullDescription(complaint.description)
                          }
                        >
                          See More
                        </button>
                      </>
                    ) : (
                      complaint.description
                    )}
                  </div>
                </div>
              </td>
              <td>{complaint.ward_no}</td>
              <td>{complaint.location}</td>
              <td>
                {complaint.assignee ? (
                  <>
                    {complaint.assignee}
                    <IoIosRemoveCircle
                      color="red"
                      onClick={() =>
                        handleAssignUser(
                          complaint._id,
                          complaints,
                          setComplaints,
                          ""
                        )
                      }
                    />
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedComplaintId(complaint._id);
                        setShowAssignModal(true);
                      }}
                    >
                      Assign
                    </button>
                  </>
                )}
              </td>
              <td>
                <select
                  value={complaint.status}
                  onChange={(e) =>
                    handleStatusChange(complaint._id, e.target.value)
                  }
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="IN PROGRESS">In Progress</option>
                </select>
                <button className="my-2 btn-primary">Submit</button>
               
              </td>
            </tr>
          ))}
      </>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div className="container mt-2 mb-2 flex-grow-1">
        <h2 className="mb-4">
          <strong>Welcome Admin!</strong>
        </h2>
        <ButtonGroup>
          <Button
            variant={complaintStatusFilter !== "ALL" ? "outlined": "primary"}
            onClick={() => {
              setComplaintStatusFilter("ALL");
            }}
          >
            All
          </Button>
          <Button
            variant={
              complaintStatusFilter !== "PENDING" ? "outlined" : "primary"
            }
            onClick={() => {
              setComplaintStatusFilter("PENDING");
            }}
          >
            Pending
          </Button>
          <Button
            variant={
              complaintStatusFilter !== "IN PROGRESS" ? "outlined" : "primary"
            }
            onClick={() => {
              setComplaintStatusFilter("IN PROGRESS");
            }}
          >
            In Progress
          </Button>
          <Button
            variant={
              complaintStatusFilter !== "COMPLETED" ? "outlined" : "primary"
            }
            onClick={() => {
              setComplaintStatusFilter("COMPLETED");
            }}
          >
            Completed
          </Button>
        </ButtonGroup>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Select complaint category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Complaints</option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div
          className="table-responsive"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr. No.</th>
                <th>Complainant's Email</th>
                <th>Complainant's Phone Number</th>
                <th>Complaint ID</th>
                <th>Priority</th>
                <th>Complaint Type</th>
                <th>Sub-type</th>
                <th>Citizen UID</th>
                <th>Description</th>
                <th>Sector No.</th>
                <th>Address</th>
                <th>Assigned to</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{renderComplaintsByCategory()}</tbody>
          </table>
        </div>
      </div>
    </div>

    
  );
};

const handleAssignUser = async (
  complaintId,
  complaints,
  setComplaints,
  assignee
) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/admin/complaints/${complaintId}/assign`,
      { assignee }
    );

    console.log(response.data);
    let newComplaints = [
      ...complaints.filter((el) => el._id !== complaintId),
      response.data,
    ];
    setComplaints(Array.from([...newComplaints]));
  } catch (error) {
    // Handle error
    console.error("Error:", error.response.data); // Log error response or do something else
  }
};

export default AdminPage;

