::����Window���±��༭���ļ���Ĭ�ϴ�ΪANSI������batʱ��ʾ������ʾ��
::��Ҫ��VSCode�༭��
::Please use Window editor edit me��save as ANSI��for bat showing Chinese
::Do not use VSCode edit me

@echo ��ر�VSCode��ռ����Ŀ�ļ��ĳ��򣬷�����;�ļ��и���ʧ��
@echo �����ڣ���@opentiny/ng.tgz���޸Ĳ���ʱ�����󣬽��������������

::�ı�Ϊ��������@opentiny/ngԴ��Ŀ¼������,�Ա��Ҳ�@opentiny/ngĿ¼���������ҵ�����node_modules/@opentiny/ng
:: (ʵ����ng9Ĭ�����ã����뻷��������node_module���Ѿ�����Ҫ�ⲽ������Ϊ�˳���Ա�������Ȼ����)
call npx shx mv -f .\@opentiny .\@opentiny_bak
::2���ı�theme css����
::call npx ng config projects.tiny3demo.architect.build.options.styles ["""node_modules/@opentiny/ng/themes/styles.css""","""node_modules/prismjs/themes/prism.css""","""src/styles.less"""]
::3��������css�����ʱ������asserts
::call npx ng config projects.tiny3demo.architect.build.options.assets ["""src/favicon.ico""","""src/assets""",{"""glob""":"""**/*""","""input""":"""node_modules/@opentiny/ng/themes/""","""output""":"""/assets/tiny3/themes/"""}]
call npx shx cp -f angular.build.json angular.json

::������������tiny3demo
call node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng  build --prod --base-href ./  || pause
call npx shx cp -rf .\src .\dist\tiny3doc\tiny3demo\src

::�ָ�Ϊ���Ի���
call npx shx mv -f .\@opentiny_bak .\@opentiny
::call npx ng config projects.tiny3demo.architect.build.options.styles ["""@opentiny/ng/themes/basic/build.less""","""@opentiny/ng/themes/theme-hws/build.less""","""node_modules/prismjs/themes/prism.css""","""src/styles.less"""]
::call npx ng config projects.tiny3demo.architect.build.options.assets ["""src/favicon.ico""","""src/assets"""]
call npx shx cp -f angular.serve.json angular.json

::����վ
call live-serve-dist.bat

pause