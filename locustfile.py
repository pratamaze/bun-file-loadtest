from locust import HttpUser, task, between
import os

class APILoadTest(HttpUser):
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks
    
    def on_start(self):
        """Setup test file for upload"""
        self.test_file_path = "test_upload.txt"
        with open(self.test_file_path, "w") as f:
            f.write("Test file for load testing")
    
    @task(2)
    def health_check(self):
        """Test health check endpoint"""
        self.client.get("/health")
    
    @task(1)
    def list_files(self):
        """Test listing files endpoint"""
        self.client.get("/files")
    
    @task(1)
    def upload_file(self):
        """Test single file upload"""
        files = {'file': open(self.test_file_path, 'rb')}
        self.client.post("/upload", files=files)
    
    @task(1)
    def download_file(self):
        """Test file download"""
        self.client.get("/download/example.txt")
    
    def on_stop(self):
        """Cleanup test file"""
        if os.path.exists(self.test_file_path):
            os.remove(self.test_file_path)