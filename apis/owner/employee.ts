import { APIResponse, request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";
import { faker } from "@faker-js/faker";

export default class EmployeeApis {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	private async createContext() {
		const username = (await getUserDetails(this.baseInstance.user)).email;
		const password = (await getUserDetails(this.baseInstance.user)).password;

		const credentials = Buffer.from(`${username}:${password}`).toString("base64");

		return request.newContext({
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				Authorization: `Basic ${credentials}`,
				"Content-Type": "application/json",
			},
		});
	}

	async createEmployee(firstName: string, lastName: string, title: string, status: string) {
		const context = await this.createContext();
		return context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				title: title,
				// eslint-disable-next-line camelcase
				current_status: status,
			},
		});
	}

	async testEmail(currentEmail: string) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/test/email/`, {
			data: {
				email: currentEmail,
			},
		});
	}

	async employeeUserCreate(email: string, firstName: string, lastName: string, employeeId: number) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/user-create/`, {
			data: {
				email: email,
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
			},
		});
	}

	async userCreate(email: string, employeeId: number) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/user-create/`, {
			data: {
				email: email,
				employeeId: employeeId,
			},
		});
	}

	async listAllEmployees() {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/`);
	}

	async getAllEmployeesV2(limit?: number, offset?: number) {
		const context = await this.createContext();
		let url = `/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/`;

		const params = new URLSearchParams();
		if (limit !== undefined) {
			params.append("limit", limit.toString());
		}
		if (offset !== undefined) {
			params.append("offset", offset.toString());
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}

		const response = await context.get(url);
		return response;
	}

	async responsibilityDirectoryList() {
		const context = await this.createContext();
		return context.get(`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibilities-directory/`);
	}

	async updateEmployee(employeeId: number, firstName: string, lastName: string, title: string) {
		const context = await this.createContext();
		return context.put(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				title: title,
			},
		});
	}

	async deleteEmployees(employeeId: number) {
		const context = await this.createContext();
		return context.delete(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/`);
	}

	async getEmployeeDetails(employeeId: number) {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/`);
	}

	async getEmployeeBadgesDetails(employeeId: number) {
		const context = await this.createContext();
		return context.get(`/api/common/account/${process.env.ACCOUNT_ID}/employee/employee-badges-detail/${employeeId}/`);
	}

	async activateEmployee(employeeId: number) {
		const context = await this.createContext();
		return context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/activate/`);
	}

	async renameEmployee(employeeId: number, EmployeeName: string, EmployeeLastName: string, EmployeeTitle: string) {
		const context = await this.createContext();
		return context.put(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: EmployeeName,
				// eslint-disable-next-line camelcase
				last_name: EmployeeLastName,
				title: EmployeeTitle,
			},
		});
	}

	async terminateEmployee(employeeId: number) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/terminate/`);
	}

	async reActivateEmployee(employeeId: number) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/reactivate/`);
	}

	async employeeCheckAccess(email: string) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/check-access/`, {
			data: {
				// eslint-disable-next-line camelcase
				email: email,
				// eslint-disable-next-line camelcase
				account: process.env.ACCOUNT_ID,
			},
		});
	}

	async getEmployeeBadge(employeeId: number) {
		const context = await this.createContext();

		return context.get(`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/badge/`);
	}

	async createBadgeForEmployeeWithReason(employeeId: number, responsibilityId: number, status: string) {
		const context = await this.createContext();
		return context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/badge/`, {
			data: {
				// eslint-disable-next-line camelcase
				level: 3,
				status: status,
				// eslint-disable-next-line camelcase
				issued_to: employeeId,
				// eslint-disable-next-line camelcase
				issued_for: responsibilityId,
			},
		});
	}

	async createBadgeForEmployee(employeeId: number, responsibilityId: number, status: string, level: number) {
		const context = await this.createContext();
		return context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/badge/`, {
			data: {
				// Dynamically pass the level
				level: level,
				status: status, // eslint-disable-next-line camelcase
				issued_to: employeeId,
				// eslint-disable-next-line camelcase
				issued_for: responsibilityId,
			},
		});
	}

	async createApprenticeBageForEmployeeWithReason(employeeId: number, responsibilityId: number) {
		const context = await this.createContext();
		return context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/badge/`, {
			data: {
				// eslint-disable-next-line camelcase
				level: 3,
				// eslint-disable-next-line camelcase
				issued_to: employeeId,
				// eslint-disable-next-line camelcase
				issued_for: responsibilityId,
				// eslint-disable-next-line camelcase
			},
		});
	}

	async getEmployeesExcludingBadge(badgeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/common/account/${process.env.ACCOUNT_ID}/employee/?exclude_employees_with_badge_for=${badgeId}`,
		);
		return response;
	}

	async getEmployeeResponse(createdUserId: number) {
		const context = await this.createContext();
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/user/${createdUserId}/access/`);
		return response;
	}

	async getListOfMasteredResponsibility(employeeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/employee/${employeeId}/mastered/`,
		);
		return response;
	}

	async getListOfCoachResponsibility(employeeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/employees-to-coach/`,
		);
		return response;
	}

	async getListOfAvaiableCoaches(employeeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/assignments/?path_to_readiness=true`,
		);
		return response;
	}

	async addPositionAssignmentToEmployee(
		employeeId: number,
		positionId: number,
		commitment: number,
		effectiveOnDate?: string,
	) {
		const context = await this.createContext();

		const effectiveDate =
			effectiveOnDate ||
			(() => {
				const today = new Date();
				const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
				return futureDate.toISOString().split("T")[0];
			})();

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position-assignment/add/`, {
			data: {
				employee: employeeId,
				position: positionId,
				commitment: commitment,
				// eslint-disable-next-line camelcase
				effective_on: effectiveDate,
			},
		});

		return response;
	}

	async addPositionAssignmentToEmployeeWithCommitment(
		employeeId: number,
		positionId: number,
		commitment: number,
		allocation: number,
		effectiveOnDate?: string,
	) {
		const context = await this.createContext();

		const effectiveDate =
			effectiveOnDate ||
			(() => {
				const today = new Date();
				const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
				return futureDate.toISOString().split("T")[0];
			})();

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position-assignment/add/`, {
			data: {
				employee: employeeId,
				position: positionId,
				commitment: commitment,
				// eslint-disable-next-line camelcase
				effective_on: effectiveDate,
				allocation: allocation,
			},
		});

		return response;
	}

	async createProficiencyBadge(employeeId: number, responsibilityId: number, levelNumber: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/create-proficiency-badge/`,
			{
				data: {
					employee: employeeId,
					responsibility: responsibilityId,
					level: levelNumber,
					forced: true,
				},
			},
		);

		return response;
	}

	async grantBadgeToEmployee(employeeId: number, responsibilityId: number, badgeLeve: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/grant-badge/`,
			{
				data: {
					responsibility: responsibilityId,
					level: badgeLeve,
					forced: true,
				},
			},
		);

		return response;
	}

	async getEmployeeAssignment(employeeId: number) {
		const context = await this.createContext();

		const response = await context.get(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/assignments/`,
		);

		return response;
	}

	async postToChatter(employeeId: number, note: string, table: string, isHistory: boolean) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/chatter/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					is_history: isHistory,
					note: note,
					table: table,
					account: process.env.ACCOUNT_ID,
					// eslint-disable-next-line camelcase
					record_id: process.env.ACCOUNT_ID,
				},
			},
		);

		return response;
	}

	async createMultipleEmployees(numberOfEmployees: number) {
		const responses: APIResponse[] = [];

		for (let i = 0; i < numberOfEmployees; i++) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const title = faker.person.jobTitle();
			const status = "Active";
			try {
				const response = await this.createEmployee(firstName, lastName, title, status);
				responses.push(response);

				console.log(`Employee ${i + 1} created successfully.`);
			} catch (error) {
				console.error(`Error creating employee ${i + 1}:`, error);
			}
		}

		return responses;
	}

	async listEmployeeChatter(employeeId: number) {
		const context = await this.createContext();

		return await context.get(`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/chatter/`);
	}

	async assignResposibilityToEmployee(responsibilityId: number, employeeId: number, commitmentId: number) {
		const context = await this.createContext();

		const response = await context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/assign-responsibility/`, {
			data: {
				// eslint-disable-next-line camelcase
				responsibility: responsibilityId,
				employee: employeeId,
				commitment: commitmentId,
			},
		});
		return response;
	}

	async assignRoleToEmployee(roleId: number, employeeId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/assign-role/`, {
			data: {
				role: roleId,
				employee: employeeId,
			},
		});
		return response;
	}

	async getRoleAssigment(employeeId: number, assignmentId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/role-assignment/${assignmentId}/`,
		);
		return response;
	}

	async removeBadge(badgeId: number, reason: string) {
		const context = await this.createContext();

		return context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/badge/${badgeId}/remove/`, {
			data: {
				// eslint-disable-next-line camelcase
				badge: 1,
				reason: reason,
			},
		});
	}

	async evaluationRequest(responsibilityId: number, employeeId: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/evaluations/`,
			{
				data: { responsibility: responsibilityId, employee: employeeId },
			},
		);

		return response;
	}

	async getResponsibilityAssignments(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/assignments/`,
		);
		return response;
	}

	async acceptEvaluationRequest(responsibilityId: number, evaluationId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/evaluations/${evaluationId}/accept/`,
		);

		return response;
	}

	async abondonEvaluationRequest(responsibilityId: number, evaluationId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/evaluations/${evaluationId}/abandon/`,
		);

		return response;
	}

	async doneEvaluationRequest(responsibilityId: number, evaluationId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/evaluations/${evaluationId}/finish/`,
		);

		return response;
	}

	async cancelEvaluationRequest(responsibilityId: number, evaluationId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/evaluations/${evaluationId}/cancel/`,
		);

		return response;
	}

	async archiveEmployee(employeeId: number) {
		const context = await this.createContext();

		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/archive/`);
	}

	async unarchiveEmployee(employeeId: number) {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/unarchive/`,
		);
	}
	async changeImportance(assignmentType: string, assignmentId: number, newImportance) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/assignment/change-importance/`, {
			data: {
				// eslint-disable-next-line camelcase
				assignment_type: assignmentType,
				// eslint-disable-next-line camelcase
				assignment_id: assignmentId,
				// eslint-disable-next-line camelcase
				new_importance: newImportance,
			},
		});
	}

	async getEmployeePathToeadiness(employeeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/common/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/path-to-readiness/`,
		);
		return response;
	}

	async runsRecalculation(employeeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/recalculate-readiness/`,
		);
		return response;
	}

	async evaluateAssignments(assignmentId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/common/account/${process.env.ACCOUNT_ID}/position-assignment/evaluate/${assignmentId}/`,
		);
		return response;
	}

	async createPositionAssign(allocation: number, assignEmployeeID: number, parentAssignmentId: number) {
		const context = await this.createContext();
		const today = new Date();
		const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
		const effectiveDate = futureDate.toISOString().split("T")[0];

		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position-assigment/`, {
			data: {
				// eslint-disable-next-line camelcase
				allocation: allocation,
				// eslint-disable-next-line camelcase
				effective_on: effectiveDate,
				// eslint-disable-next-line camelcase
				assigned_to_employee: assignEmployeeID,
				// eslint-disable-next-line camelcase
				parent_assignment_id: parentAssignmentId,
			},
		});
	}

	async createRoleAssign(
		employeeId: number,
		assignEmployeeID: number,
		parentAssignmentId: number,
		triggerEmpAssignId: number,
	) {
		const context = await this.createContext();
		return context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/role-assignment/`, {
			data: {
				// eslint-disable-next-line camelcase
				assigned_to_employee: assignEmployeeID,
				// eslint-disable-next-line camelcase
				parent_assignment_id: parentAssignmentId,
				// eslint-disable-next-line camelcase
				triggered_by_employee_to_position_assignment: triggerEmpAssignId,
			},
		});
	}

	async createResponsibilityAssign(
		employeeId: number,
		assignmentId: number,
		assignEmployeeID: number,
		parentAssignmentId: number,
		triggerEmpAssignId: number,
	) {
		const context = await this.createContext();
		return context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/employee/${employeeId}/role-assignment/${assignmentId}/responsibility-assignment/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					assigned_to_employee: assignEmployeeID,
					// eslint-disable-next-line camelcase
					parent_assignment_id: parentAssignmentId,
					// eslint-disable-next-line camelcase
					triggered_by_employee_to_position_assignment: triggerEmpAssignId,
				},
			},
		);
	}

	async getResponsibilityAssignmentsByRole(roleAssignmentId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility-assignment/?role_assignment=${roleAssignmentId}`,
		);
		return response;
	}

	async getAllResponsibilityAssignments() {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility-assignment/`,
		);
		return response;
	}

	async getResponsibilityAssignmentsByStatus(status: string) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility-assignment/?status=${status}`,
		);
		return response;
	}

	async getAllRoleAssignments() {
		const context = await this.createContext();
		const response = await context.get(`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/role-assignment/`);
		return response;
	}

	async getRoleAssignmentsByPosition(positionAssignmentId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/role-assignment/?position_assignment=${positionAssignmentId}`,
		);
		return response;
	}

	async getRoleAssignmentsByStatus(status: string) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/role-assignment/?status=${status}`,
		);
		return response;
	}

	async getActiveEmployeesReadiness() {
		const context = await this.createContext();
		const response = await context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee/readiness/`);
		return response;
	}

	async creatingEmployee(firstName: string, lastName: string, title: string, status: string, email: string) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/employee/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				title: title,
				// eslint-disable-next-line camelcase
				current_status: status,
				email: email, // Include email in the payload
			},
		});
	}

	async runAllRecalculation(employeeIds: number[]) {
		const context = await this.createContext();
		return context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/recalculate-all-readiness/`, {
			data: {
				// eslint-disable-next-line camelcase
				employees_ids: employeeIds,
			},
		});
	}

	async getReadinessBadgeForEmployee() {
		const context = await this.createContext();
		return context.get(`/api/common/account/${process.env.ACCOUNT_ID}/employee/readiness-badges/`);
	}

	async getResponsibilityList(responsibilityId: number) {
		const context = await this.createContext();
		return context.get(`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}`);
	}

	async getEvaluations(responsibilityId: number, employeeId: number) {
		const context = await this.createContext();
		return context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/evaluation/?responsibility=${responsibilityId}&employee=${employeeId}&status=active`,
		);
	}

	async getPositionAssignment() {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/position-assignment/`);
	}

	async getPositionAssignmentUsingEmployeeId(employeeId: number) {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/position-assignment/?employee=${employeeId}`);
	}

	async getPositionAssignmentActiveResponse(status: string) {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/position-assignment/?status=${status}`);
	}

	async getSidebarCounts() {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/active-counts/`);
	}

	async getEmployeesWithQueryParams(queryParams: string) {
		const context = await this.createContext();
		return context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/employee${queryParams}`);
	}

	async getPositionAssignmentWithEmployeeAndStatus(employeeId: number, status: string) {
		const context = await this.createContext();
		return context.get(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position-assignment/?employee=${employeeId}&status=${status}`,
		);
	}
}
