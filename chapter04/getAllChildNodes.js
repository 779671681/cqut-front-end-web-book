var nodes = document.getElementById('header').childNodes;
    console.log(nodes);
    
      @description ��ȱ��������ӽڵ�
      @param nodes ��ǰ�������ӽڵ㼯��
     
    function getAllChildNodes(nodes) {
        var total = nodes && nodes.length;
        console.log('total ' + total);
        for(var i = 0; i  total; i++) {
            ��ǰ������i���ڵ�
            var curNode = nodes[i]; 
            �����ǰ�ڵ㲻Ϊnull
            if(curNode) { 
                console.log(curNode);
                ��������¼��ڵ�
                if(curNode.hasChildNodes()) { 
                    arguments.callee(curNode.childNodes);
                }
            }
        }    
}