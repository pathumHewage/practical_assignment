namespace EmployeeDetailsWebApp.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public string EmailAddress { get; set; }
        public string DateOfBirth { get; set; }
        public int Age { get; set; }
        public int Salary { get; set; }
        public string Department { get; set; }
    }
}
