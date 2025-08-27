1. Xóa sạch node_modules + lockfile (ở root & app con) bằng CMD:

	rd /s /q node_modules
	rd /s /q apps\api\node_modules
	rd /s /q apps\pos-desktop\node_modules
	rd /s /q apps\backoffice-web\node_modules
	rd /s /q packages\db\node_modules
	del pnpm-lock.yaml
	pnpm store prune

2. Xóa cache electron:

	rd /s /q %LOCALAPPDATA%\electron
	rd /s /q %LOCALAPPDATA%\electron-builder
	rd /s /q %USERPROFILE%\AppData\Local\electron
	rd /s /q %USERPROFILE%\AppData\Local\electron-builder
	
3. Cài lại:

	a. root:
		pnpm add -w -D electron@28 (bản v28 ổn định hơn bản mới v3x.)
		pnpm install
			// check version electron:
				pnpx electron --version
		
	b. ở thư mục "apps/api", "apps/backoffice-web", "apps/pos-desktop':
		pnpm install
		
	c. ở thư mục "packages/db":
		pnpm prisma generate
		pnpm install