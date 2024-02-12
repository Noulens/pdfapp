import React from "react";

const PostLoading = (Component: any) => {
	return function PostLoadingComponent({ isLoading, ...props }: any) {
		if (!isLoading)
			return <Component {...props} />;
		else
			return (
				<p style={{ fontSize: '25px' }}>
					We are waiting for the file list to load!...
				</p>
			);
	};
};

export default PostLoading
