::����Window���±��༭���ļ���Ĭ�ϴ�ΪANSI������batʱ��ʾ������ʾ��
::��Ҫ��VSCode�༭��
::Please use Window editor edit me��save as ANSI��for bat showing Chinese
::Do not use VSCode edit me

@echo ��ر�VSCode��ռ����Ŀ�ļ��ĳ��򣬷�����;�ļ��и���ʧ��

::���û�а�װnpm������ִ��npm i
if not exist "node_modules" call npm i

::ȡ��tinyplus�汾��
for /f tokens^=4^ delims^=^" %%a in ('find "version" .\@opentiny\ng\package.json') do (set version=%%a)

::�����汾���ļ��У�׼����tiny.tgz��
call npx shx rm -rf .\dist\tiny3doc\tiny3npm\%version%\*
call npx shx mkdir -p .\dist\tiny3doc\tiny3npm\%version%

::����tinyplus��
call node --max_old_space_size=819200 node_modules/@angular/cli/bin/ng build tiny --configuration production || pause


::������ʽ
call npx lessc @opentiny/ng/themes/basic/build.less dist/@opentiny/ng/themes/styles.css
::������ʽ
call npx lessc @opentiny/ng/themes/theme-default/build.less dist/@opentiny/ng/themes/theme-default.css
call npx lessc @opentiny/ng/themes/theme-blue/build.less dist/@opentiny/ng/themes/theme-blue.css
call npx lessc @opentiny/ng/themes/theme-green/build.less dist/@opentiny/ng/themes/theme-green.css
call npx lessc @opentiny/ng/themes/theme-purple/build.less dist/@opentiny/ng/themes/theme-purple.css
call npx lessc @opentiny/ng/themes/theme-red/build.less dist/@opentiny/ng/themes/theme-red.css

::ѹ��tgz
cd dist\@opentiny
call npx jaguar -p ng
cd ../../
call npx shx mv -f .\dist\@opentiny\ng.tar.gz .\dist\tiny3doc\tiny3npm\%version%\ng.tgz

::��װtiny��
call npm install .\dist\tiny3doc\tiny3npm\%version%\ng.tgz

::�ı�Ϊ��������@opentiny/ngԴ��Ŀ¼������,�Ա��Ҳ�@opentiny/ngĿ¼���������ҵ�����node_modules/@opentiny/ng
:: (ʵ����ng9Ĭ�����ã����뻷��������node_module���Ѿ�����Ҫ�ⲽ������Ϊ�˳���Ա�������Ȼ����)
call npx shx mv -f .\@opentiny .\@opentiny_bak
::2���ı�theme css����
::3��������css�����ʱ������asserts
call npx shx cp -f angular.build.json angular.json


::������������tiny3demo
call node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --configuration production --base-href ./  || pause
call npx shx cp -rf .\src .\dist\tiny3doc\tiny3demo\src

::�ָ�Ϊ���Ի���
call npx shx mv -f .\@opentiny_bak .\@opentiny
call npx shx cp -f angular.serve.json angular.json

::�����ĵ�,������վ
call live-serve-dist.bat

pause