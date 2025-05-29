<template>
    <AppLayout>
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">User Management</h1>
          <p class="mt-1 text-sm text-gray-500">
            Manage users and their permissions
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <button @click="showInviteModal = true" class="btn btn-primary flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Invite User
          </button>
        </div>
      </div>
  
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
  
        <div v-else-if="users.length === 0" class="py-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by inviting a new user.</p>
          <div class="mt-6">
            <button @click="showInviteModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Invite User
            </button>
          </div>
        </div>
  
        <div v-else>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          {{ user.name.charAt(0).toUpperCase() }}
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'bg-purple-100 text-purple-800': user.role === 'owner',
                      'bg-blue-100 text-blue-800': user.role === 'admin',
                      'bg-green-100 text-green-800': user.role === 'cashier'
                    }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'bg-green-100 text-green-800': user.status === 'active',
                      'bg-gray-100 text-gray-800': user.status === 'invited',
                      'bg-red-100 text-red-800': user.status === 'suspended'
                    }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.lastActive) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-3">
                      <button @click="editUser(user)" class="text-primary-600 hover:text-primary-900" title="Edit">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="confirmDeleteUser(user)" class="text-red-600 hover:text-red-900" title="Delete">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Pagination -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                  to
                  <span class="font-medium">
                    {{ Math.min(currentPage * pageSize, totalItems) }}
                  </span>
                  of
                  <span class="font-medium">{{ totalItems }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
  
                  <button v-for="page in paginationRange" :key="page" @click="changePage(page)" :class="[
                    page === currentPage
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]">
                    {{ page }}
                  </button>
  
                  <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Invite User Modal -->
      <div v-if="showInviteModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Invite New User</h3>
                  <div class="mt-2">
                    <form class="space-y-4">
                      <div>
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" v-model="inviteForm.email" id="email" required class="form-control"
                          placeholder="user@example.com" />
                      </div>
                      <div>
                        <label for="role" class="form-label">Role</label>
                        <select v-model="inviteForm.role" id="role" required class="form-control">
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="cashier">Cashier</option>
                        </select>
                      </div>
                      <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button @click="sendInvite" :disabled="inviteLoading"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                <svg v-if="inviteLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ inviteLoading ? 'Sending...' : 'Send Invitation' }}
              </button>
              <button @click="showInviteModal = false" type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Delete User</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete this user? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button @click="deleteUser" :disabled="deleteLoading"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                <svg v-if="deleteLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ deleteLoading ? 'Deleting...' : 'Delete' }}
              </button>
              <button @click="showDeleteModal = false" type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Edit User Modal -->
      <div v-if="showEditModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
                  <div class="mt-2">
                    <form class="space-y-4">
                      <div>
                        <label for="edit-name" class="form-label">Name</label>
                        <input type="text" v-model="editForm.name" id="edit-name" required class="form-control" />
                      </div>
                      <div>
                        <label for="edit-email" class="form-label">Email</label>
                        <input type="email" v-model="editForm.email" id="edit-email" required class="form-control" />
                      </div>
                      <div>
                        <label for="edit-role" class="form-label">Role</label>
                        <select v-model="editForm.role" id="edit-role" required class="form-control">
                          <option value="admin">Admin</option>
                          <option value="cashier">Cashier</option>
                        </select>
                      </div>
                      <div>
                        <label for="edit-status" class="form-label">Status</label>
                        <select v-model="editForm.status" id="edit-status" required class="form-control">
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                      <div v-if="editError" class="text-red-600 text-sm">{{ editError }}</div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button @click="updateUser" :disabled="editLoading"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                <svg v-if="editLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ editLoading ? 'Saving...' : 'Save Changes' }}
              </button>
              <button @click="showEditModal = false" type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useAuthStore } from '../../stores/auth';
  import AppLayout from '../../components/layout/AppLayout.vue';
  import { formatDate } from '../../config';
  
  const authStore = useAuthStore();
  const loading = ref(true);
  const showInviteModal = ref(false);
  const showDeleteModal = ref(false);
  const showEditModal = ref(false);
  const inviteLoading = ref(false);
  const deleteLoading = ref(false);
  const editLoading = ref(false);
  const error = ref('');
  const editError = ref('');
  const userToDelete = ref<any>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalItems = ref(0);
  const totalPages = ref(1);
  
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
  }
  
  const users = ref<User[]>([]);
  
  const inviteForm = ref({
    email: '',
    role: 'cashier'
  });
  
  const editForm = ref({
    id: '',
    name: '',
    email: '',
    role: '',
    status: ''
  });
  
  // Pagination range calculation
  const paginationRange = computed(() => {
    const range: number[] = [];
    const maxVisiblePages = 5;
  
    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
  
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
  
    return range;
  });
  
  // Change page
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchUsers();
  };
  
  // Fetch users data
  const fetchUsers = async () => {
    try {
      loading.value = true;
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Mock data
      users.value = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'owner',
          status: 'active',
          lastActive: '2025-04-15T10:30:00'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'admin',
          status: 'active',
          lastActive: '2025-04-14T15:45:00'
        },
        {
          id: '3',
          name: 'Robert Johnson',
          email: 'robert@example.com',
          role: 'cashier',
          status: 'active',
          lastActive: '2025-04-15T09:15:00'
        },
        {
          id: '4',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          role: 'cashier',
          status: 'invited',
          lastActive: ''
        },
        {
          id: '5',
          name: 'Michael Brown',
          email: 'michael@example.com',
          role: 'cashier',
          status: 'suspended',
          lastActive: '2025-04-10T11:05:00'
        }
      ];
  
      totalItems.value = 5;
      totalPages.value = Math.ceil(totalItems.value / pageSize.value);
  
    } catch (err: any) {
      error.value = err.message || 'Failed to load users';
    } finally {
      loading.value = false;
    }
  };
  
  // Send invitation
  const sendInvite = async () => {
    try {
      inviteLoading.value = true;
      error.value = '';
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Add the invited user to the list
      users.value.unshift({
        id: Math.random().toString(36).substring(2, 9),
        name: 'Invited User',
        email: inviteForm.value.email,
        role: inviteForm.value.role,
        status: 'invited',
        lastActive: ''
      });
  
      showInviteModal.value = false;
      inviteForm.value = { email: '', role: 'cashier' };
    } catch (err: any) {
      error.value = err.message || 'Failed to send invitation';
    } finally {
      inviteLoading.value = false;
    }
  };
  
  // Confirm delete user
  const confirmDeleteUser = (user: User) => {
    userToDelete.value = user;
    showDeleteModal.value = true;
  };
  
  // Delete user
  const deleteUser = async () => {
    try {
      deleteLoading.value = true;
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Remove the user from the list
      users.value = users.value.filter(u => u.id !== userToDelete.value.id);
  
      showDeleteModal.value = false;
      userToDelete.value = null;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete user';
    } finally {
      deleteLoading.value = false;
    }
  };
  
  // Edit user
  const editUser = (user: User) => {
    editForm.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };
    showEditModal.value = true;
  };
  
  // Update user
  const updateUser = async () => {
    try {
      editLoading.value = true;
      editError.value = '';
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Update the user in the list
      const index = users.value.findIndex(u => u.id === editForm.value.id);
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          name: editForm.value.name,
          email: editForm.value.email,
          role: editForm.value.role,
          status: editForm.value.status
        };
      }
  
      showEditModal.value = false;
    } catch (err: any) {
      editError.value = err.message || 'Failed to update user';
    } finally {
      editLoading.value = false;
    }
  };
  
  onMounted(() => {
    fetchUsers();
  });
  </script>