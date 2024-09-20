// hoc/withAuth.tsx
import { useEffect } from 'react';
import { useAuth } from '../../useAuth';
import { useRouter } from "next/navigation"; // For App Router, use `next/navigation`

// Higher-order component to protect routes
const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Redirect to login page if not authenticated
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Or a loading spinner if you want
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
