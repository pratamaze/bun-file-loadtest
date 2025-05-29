from locust import HttpUser, task, between
import os

class APILoadTest(HttpUser):
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks
    
    def on_start(self):
        """Setup test files for upload"""
        # Create small file (10KB)
        self.small_file_path = "files/test_small.txt"
        with open(self.small_file_path, "w") as f:
            f.write("A" * (10 * 1024))  # 10KB of data
            
        # Create medium file (100KB)
        self.medium_file_path = "files/test_medium.txt"
        with open(self.medium_file_path, "w") as f:
            f.write("B" * (100 * 1024))  # 100KB of data
            
        # Create large file (1000KB)
        self.large_file_path = "files/test_large.txt"
        with open(self.large_file_path, "w") as f:
            f.write("C" * (1000 * 1024))  # 1000KB of data
    
    @task(2)
    def health_check(self):
        """Test health check endpoint"""
        self.client.get("/health")
    
    @task(1)
    def list_files(self):
        """Test listing files endpoint"""
        self.client.get("/files")
    
    @task(3)
    def upload_small_file(self):
        """Test small file upload (10KB)"""
        files = {'file': open(self.small_file_path, 'rb')}
        self.client.post("/upload/small", files=files)
    
    @task(2)
    def upload_medium_file(self):
        """Test medium file upload (100KB)"""
        files = {'file': open(self.medium_file_path, 'rb')}
        self.client.post("/upload/medium", files=files)
    
    @task(1)
    def upload_large_file(self):
        """Test large file upload (1000KB)"""
        files = {'file': open(self.large_file_path, 'rb')}
        self.client.post("/upload/large", files=files)
    
    @task(1)
    def download_file(self):
        """Test file download"""
        self.client.get("/download/example.txt")
    
    def on_stop(self):
        """Cleanup test files"""
        for file_path in [self.small_file_path, self.medium_file_path, self.large_file_path]:
            if os.path.exists(file_path):
                os.remove(file_path)