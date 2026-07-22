import { Link } from "react-router-dom";
import { MOCK_ENROLLMENTS } from "../../config/mockEnrollments";
import { getCourseBySlug } from "../../config/mockCourses";

export default function DashboardOrderHistoryPage() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold text-ink">Order History</h2>
        <p className="mt-1 text-sm text-slate">Every course you've purchased, with pricing and status.</p>
      </div>

      {MOCK_ENROLLMENTS.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary-light bg-white px-6 py-14 text-center text-sm text-slate">
          No orders yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-light bg-surface text-[10px] font-semibold uppercase tracking-[0.14em] text-slate">
                  <th className="px-5 py-3.5">Order #</th>
                  <th className="px-5 py-3.5">Course</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Payment</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ENROLLMENTS.map((order) => {
                  const course = getCourseBySlug(order.courseSlug);
                  return (
                    <tr key={order.id} className="border-b border-primary-light last:border-0">
                      <td className="px-5 py-4 font-medium text-ink">{order.orderNumber}</td>
                      <td className="px-5 py-4">
                        {course ? (
                          <Link
                            to={`/dashboard/courses/${course.slug}`}
                            className="font-medium text-primary-dark transition hover:underline"
                          >
                            {course.title}
                          </Link>
                        ) : (
                          <span className="text-slate">Course unavailable</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate">
                        {new Date(order.purchasedAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-slate">{order.paymentMethod}</td>
                      <td className="px-5 py-4 font-semibold text-ink">${order.pricePaid}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-[#16803c]">
                          Paid
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
