import { useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline'; // Import CheckCircleIcon for success
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

export default function SuccessModal({ isOpen, onClose }) {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Automatically close the modal after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Success! Your Blog Post is Live
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Congratulations! Your blog post has been submitted successfully. Check your profile for further details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  navigate("/Profile"); // Navigate to Profile
                  onClose(); // Close the modal
                }}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Go To Profile
              </button>
              <button
                type="button"
                onClick={() => {

                  navigate("/new-story"); // Navigate to new story page
                  onClose(); // Close the modal
                  window.location.reload();
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
